"""
2025년 카드 지출 분석 스크립트
Usage: python3 scripts/analyze_spending.py

PDF 파일 경로를 아래에 지정하세요.
"""

import pdfplumber
import re
import json
from collections import defaultdict

# ─── 파일 경로 설정 ───
KB_CARD_PDF   = "uploads/kb_card.pdf"       # KB카드 이용내역서
HYUNDAI_CARD_PDF = "uploads/hyundai_card.pdf"  # 현대카드 이용내역서


def parse_kb_card(path):
    """KB카드: 앞 10페이지(거래정보) + 뒤 10페이지(금액) 분리 구조"""
    txns = []
    with pdfplumber.open(path) as pdf:
        n = len(pdf.pages)
        half = n // 2
        # 거래 정보 (날짜+가맹점)
        for i in range(half):
            tables = pdf.pages[i].extract_tables()
            if tables:
                for row in tables[0]:
                    if row[0] and re.match(r'^\d{4}\.\d{2}\.\d{2}$', str(row[0])):
                        txns.append({'date': row[0], 'merchant': str(row[5] if len(row)>5 else '').replace('\n',' ').strip(), 'amount': 0, 'card': 'KB'})
        # 금액
        amounts = []
        for i in range(half, n):
            text = pdf.pages[i].extract_text() or ''
            for line in text.split('\n'):
                m = re.match(r'^([\d,]+)\s+([\d,]+)\s+([\d,]+)\s+([\d,]+)\s+([\d\-]+)$', line.strip())
                if m:
                    total = int(m.group(1).replace(',',''))
                    if total < 5_000_000:
                        amounts.append(total)
        for i, amt in enumerate(amounts):
            if i < len(txns):
                txns[i]['amount'] = amt
    return [t for t in txns if t['amount'] > 0]


def parse_hyundai_card(path):
    """현대카드: 날짜 가맹점 승인금액 이용금액 부가세 형식"""
    txns = []
    with pdfplumber.open(path) as pdf:
        for page in pdf.pages:
            text = page.extract_text() or ''
            for line in text.split('\n'):
                m = re.match(r'^(\d{4}\.\d{2}\.\d{2})\s+(.+?)\s+([\d,]+)\s+([\d,]+)\s+([\d,]+)$', line.strip())
                if m:
                    date, merchant, _, amt2, _ = m.groups()
                    amount = int(amt2.replace(',',''))
                    if amount > 0:
                        txns.append({'date': date, 'merchant': merchant.strip(), 'amount': amount, 'card': '현대'})
    return txns


def categorize(merchant):
    rules = [
        ('delivery',     '배달음식',          '🛵', ['우아한형제들','배달의민족','알뜰배주달','쿠팡이츠']),
        ('cafe',         '카페/음료',          '☕', ['빽다방','공차','스타벅스','이디야','할리스','투썸','폴바셋','테라로사','커피','카페','서혜커피','매머드','리사르','르빵','뚜레쥬르','프럼크릭']),
        ('restaurant',   '외식/식당',          '🍽️', ['식당','게장','정식','칼국수','샤브','구이','거궁','하이테이블','현에프앤비','돈타래','행운','합정티라미수','더노벰버','갤러리아 컨벤션 식품','재래시장','버거킹','맥도날드','치킨','피자','초밥','삼겹','갈비','냉면','국밥','설렁탕','된장','부대찌개','참치','대진도원참치','육산장','별똥구리','미분당','델리에또','뭉텅','옥된장','심양','군산오징어','김삿갓','동양솥밥','우대포','밖','아워홈','곤트란쉐리에','나인블럭','멘지','금별맥주','라운지엑스']),
        ('convenience',  '편의점',            '🏪', ['GS25','CU ','씨유','세븐일레븐','이마트24','미니스톱','씨유CU','1119','(주)코리아세븐']),
        ('mart',         '마트/쇼핑몰',        '🛒', ['이마트에브리데이','지에스더프레시','GS THE FRESH','홈플러스','롯데마트','코사마트','갤러리아 광교점','현대백화점','롯데쇼핑','롯데몰']),
        ('toll',         '통행료/교통',        '🚗', ['한국도로공사','인천국제공항고속도로','수원순환도로','용서고속도로','경기남부도로','지하철','07월지하철','KIS정보통신']),
        ('fuel',         '주유비',            '⛽', ['주유소','주유','SK에너지','GS칼텍스','에쓰오일','한미석유','씨앤에스유통','대호에너지']),
        ('parking',      '주차비',            '🅿️', ['주차','파킹','나이스파크','하이파킹','아마노','나이스인프라','현암파킹','화동 유료','수원도시공사','스타필드수원']),
        ('pet',          '반려동물/동물병원',   '🐾', ['수원스카이동물메디컬','동물병원','애니펫','다솜다솜','위즐','펫','댕글라이프']),
        ('medical',      '의료/약국',          '🏥', ['의원','병원','약국','의학과','치과','한의','정신건강','리지','동암가장','동암프라자','메디포스트','타이어프로','헤스키']),
        ('telecom',      '통신비',            '📱', ['에스케이텔레콤','SKT','#SKT','SK텔레콤','KT ','LG유플러스']),
        ('shopping',     '쇼핑/의류',          '👕', ['무신사','유니클로','에프알엘코리아','한섬','자라','에이치엔엠','스파오','나이키','에스씨케이','다이소','아성산업','오앤유','트라이씨클','크림 주식회사','노마드컴퍼니','놀유니버스','노체어']),
        ('beauty',       '미용/뷰티',          '💇', ['헤어','미용','준오','뷰티','네일','올리브영','피부']),
        ('culture',      '문화/여가',          '🎬', ['CGV','CJCGV','씨제이씨지브이','영화','공연','전시','디뮤지엄','목목문화재단','박물관','국립국악원','당구','볼링','쏘카','케이엠파크','더그림엔터테인먼트','미디어앤아트','판씨네마','헤르츠']),
        ('sports',       '운동/스포츠',        '🏃', ['헬스','피트니스','스포츠','굿러닝','크세모스','어스(US)','대성시스템']),
        ('housing',      '주거/관리비',        '🏠', ['광교센트럴푸','관리비','에이스테크노타워','자치위원회']),
        ('online',       '온라인/구독',        '🖥️', ['네이버페이','에스케이플래닛','비바리퍼블리카','교보문고','팀스파르타','에이치와이앤컴퍼니','스테픽스','글린트','티에프','에이치투라이프','씨에이엔','시스(SYS)']),
        ('insurance',    '보험',              '🛡️', ['KB손해보험','케이비손해보험','보험','손보','생명']),
        ('business',     '사무/전문서비스',     '💼', ['법무법인','명인','변호사','세무','진광열쇠','불여우오피스']),
        ('tax',          '세금/공과금',        '📋', ['지방세','세입금','경찰청','국세']),
    ]
    for cat_key, cat_name, emoji, keywords in rules:
        if any(kw in merchant for kw in keywords):
            return cat_key, cat_name, emoji
    return 'other', '기타', '❓'


def generate_report(all_txns, output_path='public/spending_report.html'):
    for t in all_txns:
        t['cat_key'], t['cat_name'], t['emoji'] = categorize(t['merchant'])
        t['month'] = t['date'][5:7]

    cat_stats = defaultdict(lambda: {'total':0,'count':0,'monthly':defaultdict(int),'merchants':defaultdict(int)})
    for t in all_txns:
        k = t['cat_key']
        cat_stats[k]['total'] += t['amount']
        cat_stats[k]['count'] += 1
        cat_stats[k]['monthly'][t['month']] += t['amount']
        cat_stats[k]['merchants'][t['merchant']] += t['amount']
        cat_stats[k]['name'] = t['cat_name']
        cat_stats[k]['emoji'] = t['emoji']

    # Save JSON
    monthly_totals = defaultdict(int)
    for t in all_txns:
        monthly_totals[t['month']] += t['amount']

    grand_total = sum(t['amount'] for t in all_txns)
    data_out = {
        'transactions': all_txns,
        'cat_stats': {k: {'total':v['total'],'count':v['count'],'monthly':dict(v['monthly']),
                           'top_merchants': sorted(v['merchants'].items(), key=lambda x:-x[1])[:8],
                           'name':v['name'],'emoji':v['emoji']} for k,v in cat_stats.items()},
        'monthly_totals': dict(sorted(monthly_totals.items())),
        'grand_total': grand_total
    }
    with open('card_analysis.json', 'w', encoding='utf-8') as f:
        json.dump(data_out, f, ensure_ascii=False)

    print(f"분석 완료: {len(all_txns)}건, 총 {grand_total:,}원")
    for k, v in sorted(cat_stats.items(), key=lambda x: -x[1]['total']):
        pct = v['total'] / grand_total * 100
        print(f"  {v['emoji']} {v['name']:18s} {v['total']:>10,}원 ({pct:4.1f}%) {v['count']:3d}건")


if __name__ == '__main__':
    print("KB카드 파싱...")
    kb = parse_kb_card(KB_CARD_PDF)
    print("현대카드 파싱...")
    hd = parse_hyundai_card(HYUNDAI_CARD_PDF)
    all_txns = kb + hd
    generate_report(all_txns)
