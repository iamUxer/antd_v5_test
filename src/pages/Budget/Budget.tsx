import {
  Alert,
  Button,
  Card,
  Col,
  Collapse,
  Progress,
  Row,
  Select,
  Space,
  Table,
  Tag,
  Typography,
} from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { useMemo, useState } from 'react';
import {
  bankFixed,
  cardItems,
  specialBudget,
  savingsAllocations,
  BANK_TOTAL,
  CARD_TOTAL,
  MONTHLY_INCOME,
  MONTHLY_TOTAL,
  type BudgetItem,
  type SavingsAllocationItem,
  type SpecialBudgetItem,
} from '@/data/budget';
import { useLiveFinanceData } from '@/hooks/useLiveFinanceData';
import { useLayoutAdaptation } from '@/hooks/useLayoutAdaptation';
import type { LiveCardTransaction } from '@/data/liveSpending';

const { Title, Text } = Typography;
const fmt = (n: number) => n.toLocaleString('ko-KR') + '원';

type CardDetailRow = {
  id: string;
  date: string;
  merchant: string;
  amount: number;
  source: '신한' | '국민' | '현대';
};

type BankDetailRow = {
  id: string;
  date: string;
  merchant: string;
  amount: number;
};

type CardCompanyTotalRow = {
  key: '신한' | '국민' | '현대';
  source: '신한' | '국민' | '현대';
  amount: number;
  count: number;
};

const specialColumns: ColumnsType<SpecialBudgetItem> = [
  {
    title: '항목',
    dataIndex: 'name',
    key: 'name',
    render: (name: string, record: BudgetItem) => (
      <span>
        {record.emoji} {name}
      </span>
    ),
  },
  {
    title: '금액',
    dataIndex: 'amount',
    key: 'amount',
    align: 'right',
    render: (v: number) => <Text strong>{fmt(v)}</Text>,
  },
  {
    title: '납부 시기',
    dataIndex: 'month',
    key: 'month',
    render: (v: string) => <Tag color="orange">{v}</Tag>,
  },
  {
    title: '결제 수단',
    dataIndex: 'paymentMethod',
    key: 'method',
    render: (v: string) => (
      <Tag color={v === 'card' ? 'blue' : 'green'}>
        {v === 'card' ? '카드' : '은행'}
      </Tag>
    ),
  },
];

const bankFooter = () => (
  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
    <Text strong>소계</Text>
    <Text strong style={{ color: '#6366f1' }}>
      {fmt(BANK_TOTAL)}
    </Text>
  </div>
);

const MONTH_OPTIONS = Array.from({ length: 19 }, (_, i) => {
  const base = new Date(2026, 5 + i, 1); // 2026-06 ~ 2027-12
  const value = `${base.getFullYear()}-${String(base.getMonth() + 1).padStart(2, '0')}`;
  const label = `${base.getFullYear()}년 ${base.getMonth() + 1}월`;
  return { value, label };
});

const STATIC_CARD_ACTUALS: Record<
  string,
  Partial<Record<BudgetItem['key'], number>>
> = {
  '2026-06': {
    maint: 0,
    skt: 0,
    fuel: 210_000,
    lucky: 30_000,
    coupang: 180_000,
    dining: 215_000,
    lunch: 110_000,
  },
};

const STATIC_BANK_ACTUALS: Record<
  string,
  Partial<Record<BudgetItem['key'], number>>
> = {
  '2026-06': {
    rent: 0,
    bmw: 0,
    loan: 0,
    kb_ins: 0,
    health: 0,
    pension: 0,
    hana_ins: 0,
    donation: 0,
    cuckoo: 0,
    dues: 0,
  },
};

function categorizeCardItem(tx: LiveCardTransaction): BudgetItem['key'] {
  const text = `${tx.merchant}`.toLowerCase();
  if (/관리비|센트럴푸|입주자/.test(text)) return 'maint';
  if (/skt|sk텔레콤|통신|cursor/.test(text)) return 'skt';
  if (/주유|오일|칼텍스|에너지|주차|톨|하이패스/.test(text)) return 'fuel';
  if (/럭키|동물|펫|애견/.test(text)) return 'lucky';
  if (/쿠팡|컬리|이마트|홈플러스|마트|슈퍼/.test(text)) return 'coupang';
  if (/점심|구내|아워홈|엘에스씨푸드/.test(text)) return 'lunch';
  if (/식당|레스토랑|배달|음식|푸드|쇼핑|헤어|뷰티|의류|올리브영|루이의원/.test(text))
    return 'dining';
  return 'dining';
}

function parseTxDate(value: string): Date | null {
  const text = value.trim();
  const match = text.match(/(\d{2,4})\D+(\d{1,2})\D+(\d{1,2})/);
  if (!match) return null;
  const yearRaw = match[1];
  const year = yearRaw.length === 2 ? Number(`20${yearRaw}`) : Number(yearRaw);
  const month = Number(match[2]);
  const day = Number(match[3]);
  if (
    !Number.isFinite(year) ||
    !Number.isFinite(month) ||
    !Number.isFinite(day)
  )
    return null;
  return new Date(year, month - 1, day);
}

function toYearMonth(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

function getBillingCycleRange(
  selectedMonth: string,
  startDay: number,
  endDay: number,
) {
  const [yearStr, monthStr] = selectedMonth.split('-');
  const year = Number(yearStr);
  const month = Number(monthStr);
  const start = new Date(year, month - 2, startDay); // previous month
  const end = new Date(year, month - 1, endDay); // current month
  return { start, end };
}

function filterByDateRange(
  txs: LiveCardTransaction[],
  start: Date,
  end: Date,
): LiveCardTransaction[] {
  return txs.filter((tx) => {
    const d = parseTxDate(tx.date);
    if (!d) return false;
    return d >= start && d <= end;
  });
}

export function Budget() {
  const { isMobile } = useLayoutAdaptation();
  const {
    data: liveFinance,
    loading,
    error,
    refresh,
    loadedAtText,
  } = useLiveFinanceData();
  const shinhanCardTxs = liveFinance.shinhanCard?.transactions ?? [];
  const kbCardTxs = liveFinance.kbCard?.transactions ?? [];
  const hyundaiCardTxs = liveFinance.hyundaiCard?.transactions ?? [];
  const liveBankTxs = liveFinance.shinhanBank?.transactions ?? [];
  const [selectedMonth, setSelectedMonth] = useState<string>('2026-06');

  const selectedIndex = MONTH_OPTIONS.findIndex(
    (m) => m.value === selectedMonth,
  );
  const selectedLabel = MONTH_OPTIONS[selectedIndex]?.label ?? selectedMonth;
  const shinhanKbCycle = useMemo(
    () => getBillingCycleRange(selectedMonth, 12, 11),
    [selectedMonth],
  );
  const hyundaiCycle = useMemo(
    () => getBillingCycleRange(selectedMonth, 14, 13),
    [selectedMonth],
  );
  const shinhanCycleTxs = useMemo(
    () =>
      filterByDateRange(
        shinhanCardTxs,
        shinhanKbCycle.start,
        shinhanKbCycle.end,
      ),
    [shinhanCardTxs, shinhanKbCycle.end, shinhanKbCycle.start],
  );
  const kbCycleTxs = useMemo(
    () =>
      filterByDateRange(kbCardTxs, shinhanKbCycle.start, shinhanKbCycle.end),
    [kbCardTxs, shinhanKbCycle.end, shinhanKbCycle.start],
  );
  const hyundaiCycleTxs = useMemo(
    () =>
      filterByDateRange(hyundaiCardTxs, hyundaiCycle.start, hyundaiCycle.end),
    [hyundaiCardTxs, hyundaiCycle.end, hyundaiCycle.start],
  );
  const bankMonthTxs = useMemo(
    () =>
      liveBankTxs.filter((tx) => {
        const d = parseTxDate(tx.date);
        return d ? toYearMonth(d) === selectedMonth : false;
      }),
    [liveBankTxs, selectedMonth],
  );
  const hasLiveCardForMonth =
    shinhanCycleTxs.length + kbCycleTxs.length + hyundaiCycleTxs.length > 0;
  const cardDetailByItem = useMemo(() => {
    const map = Object.fromEntries(
      cardItems.map((item) => [item.key, [] as CardDetailRow[]]),
    ) as Record<BudgetItem['key'], CardDetailRow[]>;

    if (!hasLiveCardForMonth) {
      return map;
    }

    const pushTx = (
      tx: LiveCardTransaction,
      key: BudgetItem['key'],
      source: CardDetailRow['source'],
    ) => {
      map[key].push({
        id: `${source}-${tx.id}`,
        date: tx.date,
        merchant: tx.merchant,
        amount: tx.amount,
        source,
      });
    };

    shinhanCycleTxs.forEach((tx) => {
      pushTx(tx, categorizeCardItem(tx), '신한');
    });
    // 국민카드는 전액 쿠팡 예산으로 집계
    kbCycleTxs.forEach((tx) => {
      pushTx(tx, 'coupang', '국민');
    });
    hyundaiCycleTxs.forEach((tx) => {
      pushTx(tx, categorizeCardItem(tx), '현대');
    });

    Object.keys(map).forEach((key) => {
      map[key as BudgetItem['key']].sort((a, b) => {
        const da = parseTxDate(a.date)?.getTime() ?? 0;
        const db = parseTxDate(b.date)?.getTime() ?? 0;
        return db - da;
      });
    });

    return map;
  }, [hasLiveCardForMonth, hyundaiCycleTxs, kbCycleTxs, shinhanCycleTxs]);

  const bankActualByItem = useMemo(() => {
    const baseline = Object.fromEntries(
      bankFixed.map((item) => [item.key, 0]),
    ) as Record<BudgetItem['key'], number>;
    const hasLiveBank = bankMonthTxs.length > 0;
    if (hasLiveBank) {
      for (const tx of bankMonthTxs) {
        const text = tx.merchant.toLowerCase();
        if (/월세|임대|rent/.test(text)) baseline.rent += tx.amount;
        else if (/bmw|비엠더블유|할부/.test(text)) baseline.bmw += tx.amount;
        else if (/대출|이자|loan/.test(text)) baseline.loan += tx.amount;
        else if (/kb.*보험|케이비.*보험/.test(text))
          baseline.kb_ins += tx.amount;
        else if (/건강보험/.test(text)) baseline.health += tx.amount;
        else if (/국민연금/.test(text)) baseline.pension += tx.amount;
        else if (/하나.*보험|손해보험/.test(text))
          baseline.hana_ins += tx.amount;
        else if (/기부|후원/.test(text)) baseline.donation += tx.amount;
        else if (/쿠쿠|렌탈/.test(text)) baseline.cuckoo += tx.amount;
        else if (/당비|회비/.test(text)) baseline.dues += tx.amount;
      }
      return baseline;
    }

    const monthOverride = STATIC_BANK_ACTUALS[selectedMonth] ?? {};
    Object.entries(monthOverride).forEach(([k, v]) => {
      baseline[k as BudgetItem['key']] = v ?? 0;
    });
    return baseline;
  }, [bankMonthTxs, selectedMonth]);

  const cardActualByItem = useMemo(() => {
    const baseline = Object.fromEntries(
      cardItems.map((item) => [item.key, 0]),
    ) as Record<BudgetItem['key'], number>;

    if (!hasLiveCardForMonth) {
      const monthOverride = STATIC_CARD_ACTUALS[selectedMonth] ?? {};
      Object.entries(monthOverride).forEach(([k, v]) => {
        baseline[k as BudgetItem['key']] = v ?? 0;
      });
    }

    if (hasLiveCardForMonth) {
      // 국민카드는 전액 쿠팡 예산으로 집계
      kbCycleTxs.forEach((tx) => {
        baseline.coupang += tx.amount;
      });

      shinhanCycleTxs.forEach((tx) => {
        const key = categorizeCardItem(tx);
        baseline[key] += tx.amount;
      });

      hyundaiCycleTxs.forEach((tx) => {
        const key = categorizeCardItem(tx);
        baseline[key] += tx.amount;
      });
    }

    return baseline;
  }, [
    hasLiveCardForMonth,
    hyundaiCycleTxs,
    kbCycleTxs,
    selectedMonth,
    shinhanCycleTxs,
  ]);

  const bankActualTotal = useMemo(
    () =>
      bankFixed.reduce(
        (sum, item) => sum + (bankActualByItem[item.key] ?? 0),
        0,
      ),
    [bankActualByItem],
  );
  const cardActualTotal = useMemo(
    () =>
      cardItems.reduce(
        (sum, item) => sum + (cardActualByItem[item.key] ?? 0),
        0,
      ),
    [cardActualByItem],
  );
  const monthlyActualTotal = bankActualTotal + cardActualTotal;
  const overBudgetItems = useMemo(
    () =>
      cardItems
        .filter((item) => item.key !== 'lucky' && (cardActualByItem[item.key] ?? 0) > item.amount)
        .map((item) => ({
          name: item.name,
          budget: item.amount,
          actual: cardActualByItem[item.key] ?? 0,
        })),
    [cardActualByItem],
  );

  const cardGap = CARD_TOTAL - cardActualTotal;
  const monthGap = MONTHLY_TOTAL - monthlyActualTotal;
  const expectedSavings = MONTHLY_INCOME - MONTHLY_TOTAL;
  const actualSavings = MONTHLY_INCOME - monthlyActualTotal;
  const savingsAllocationTotal = useMemo(
    () => savingsAllocations.reduce((sum, item) => sum + item.amount, 0),
    [],
  );
  const savingsAllocationGap = expectedSavings - savingsAllocationTotal;
  const liveCardCsvTotal = useMemo(
    () =>
      shinhanCycleTxs.reduce((s, tx) => s + tx.amount, 0) +
      kbCycleTxs.reduce((s, tx) => s + tx.amount, 0) +
      hyundaiCycleTxs.reduce((s, tx) => s + tx.amount, 0),
    [hyundaiCycleTxs, kbCycleTxs, shinhanCycleTxs],
  );
  const liveBankCsvTotal = useMemo(
    () => bankMonthTxs.reduce((s, tx) => s + tx.amount, 0),
    [bankMonthTxs],
  );
  const cardCompanyTotals = useMemo<CardCompanyTotalRow[]>(
    () => [
      {
        key: '신한',
        source: '신한',
        amount: shinhanCycleTxs.reduce((s, tx) => s + tx.amount, 0),
        count: shinhanCycleTxs.length,
      },
      {
        key: '국민',
        source: '국민',
        amount: kbCycleTxs.reduce((s, tx) => s + tx.amount, 0),
        count: kbCycleTxs.length,
      },
      {
        key: '현대',
        source: '현대',
        amount: hyundaiCycleTxs.reduce((s, tx) => s + tx.amount, 0),
        count: hyundaiCycleTxs.length,
      },
    ],
    [hyundaiCycleTxs, kbCycleTxs, shinhanCycleTxs],
  );
  const bankComparisonRows = useMemo<BankDetailRow[]>(
    () =>
      bankMonthTxs
        .map((tx) => ({
          id: tx.id,
          date: tx.date,
          merchant: tx.merchant,
          amount: tx.amount,
        }))
        .sort((a, b) => {
          const da = parseTxDate(a.date)?.getTime() ?? 0;
          const db = parseTxDate(b.date)?.getTime() ?? 0;
          return db - da;
        }),
    [bankMonthTxs],
  );
  const cardRate = CARD_TOTAL > 0 ? liveCardCsvTotal / CARD_TOTAL : 0;
  const bankRate = BANK_TOTAL > 0 ? liveBankCsvTotal / BANK_TOTAL : 0;

  const buildBudgetBar = (rate: number) => {
    if (rate <= 1) {
      return {
        green: Math.max(0, Math.min(100, rate * 100)),
        red: 0,
        gray: Math.max(0, 100 - rate * 100),
      };
    }
    // 초과 시: 실제 사용량에서 예산분(초록)과 초과분(빨강) 비중으로 100%를 채움
    const green = (1 / rate) * 100;
    const red = ((rate - 1) / rate) * 100;
    return {
      green: Math.max(0, Math.min(100, green)),
      red: Math.max(0, Math.min(100, red)),
      gray: 0,
    };
  };
  const cardBar = buildBudgetBar(cardRate);
  const bankBar = buildBudgetBar(bankRate);

  const cardFooter = () => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: 8,
        flexWrap: 'wrap',
      }}
    >
      <Text strong>소계</Text>
      <Space size={12} wrap>
        <Text type="secondary" style={{ fontSize: 12 }}>
          실사용 {fmt(cardActualTotal)}
        </Text>
        <Text strong style={{ color: '#22c55e' }}>
          예산 {fmt(CARD_TOTAL)}
        </Text>
        <Text strong style={{ color: cardGap >= 0 ? '#22c55e' : '#ef4444' }}>
          차이 {cardGap >= 0 ? '+' : '-'}
          {fmt(Math.abs(cardGap))}
        </Text>
      </Space>
    </div>
  );

  const usageCol = (source: Record<string, number>) => ({
    title: '실사용',
    key: 'usage',
    render: (_: unknown, item: BudgetItem) => {
      const actual = source[item.key] ?? 0;
      const percent =
        item.amount > 0 ? Math.round((actual / item.amount) * 100) : 0;
      return (
        <div style={{ minWidth: 210 }}>
          <Progress
            percent={Math.min(200, percent)}
            showInfo={false}
            strokeColor={percent <= 100 ? '#22c55e' : '#ef4444'}
            size="small"
            style={{ marginBottom: 4 }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Text type="secondary" style={{ fontSize: 11 }}>
              {actual.toLocaleString()}원
            </Text>
            <Text type="secondary" style={{ fontSize: 11 }}>
              {percent}%
            </Text>
          </div>
        </div>
      );
    },
  });

  const amountCol = {
    title: '예산',
    dataIndex: 'amount',
    key: 'amount',
    align: 'right' as const,
    render: (v: number) => <Text strong>{fmt(v)}</Text>,
  };
  const nameCol = {
    title: '항목',
    dataIndex: 'name',
    key: 'name',
    render: (name: string, record: BudgetItem) => (
      <span>
        {record.emoji} {name}
      </span>
    ),
  };
  const bankColumns: ColumnsType<BudgetItem> = [
    nameCol,
    usageCol(bankActualByItem),
    amountCol,
  ];
  const cardDetailColumns: ColumnsType<CardDetailRow> = [
    { title: '거래일', dataIndex: 'date', key: 'date', width: 120 },
    { title: '가맹점', dataIndex: 'merchant', key: 'merchant' },
    {
      title: '사용금액',
      dataIndex: 'amount',
      key: 'amount',
      align: 'right',
      width: 130,
      render: (v: number) => <Text strong>{fmt(v)}</Text>,
    },
    {
      title: '카드',
      dataIndex: 'source',
      key: 'source',
      width: 80,
      align: 'center',
      responsive: ['md'],
      render: (v: CardDetailRow['source']) => <Tag>{v}</Tag>,
    },
  ];
  const cardCollapseItems = cardItems.map((item) => {
    const actual = cardActualByItem[item.key] ?? 0;
    const percent =
      item.amount > 0 ? Math.round((actual / item.amount) * 100) : 0;
    const rate = item.amount > 0 ? actual / item.amount : 0;
    const itemBar = buildBudgetBar(rate);
    const isVariableBudget = item.amount === 0;
    const details = cardDetailByItem[item.key] ?? [];
    return {
      key: item.key,
      label: (
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexWrap: isMobile ? 'wrap' : 'nowrap',
            justifyContent: 'space-between',
            alignItems: isMobile ? 'flex-start' : 'center',
            gap: isMobile ? 8 : 14,
            paddingRight: 8,
          }}
        >
          <span style={{ minWidth: isMobile ? undefined : 108 }}>
            {item.emoji} {item.name}
          </span>
          <div
            style={{
              flex: 1,
              minWidth: isMobile ? '100%' : 140,
              maxWidth: isMobile ? '100%' : 260,
              display: 'flex',
              height: 8,
              borderRadius: 999,
              overflow: 'hidden',
              background: '#e5e7eb',
            }}
          >
            {isVariableBudget ? (
              <>
                <div
                  style={{
                    width: `${actual > 0 ? 100 : 0}%`,
                    background: '#3b82f6',
                  }}
                />
                <div
                  style={{
                    width: `${actual > 0 ? 0 : 100}%`,
                    background: '#e5e7eb',
                  }}
                />
              </>
            ) : (
              <>
                <div
                  style={{ width: `${itemBar.green}%`, background: '#22c55e' }}
                />
                <div
                  style={{ width: `${itemBar.red}%`, background: '#ef4444' }}
                />
                <div
                  style={{ width: `${itemBar.gray}%`, background: '#e5e7eb' }}
                />
              </>
            )}
          </div>
          <Space size={10} wrap>
            <Text type="secondary" style={{ fontSize: 12 }}>
              실사용 {fmt(actual)}
            </Text>
            <Text type="secondary" style={{ fontSize: 12 }}>
              {percent}%
            </Text>
            <Text strong>{fmt(item.amount)}</Text>
          </Space>
        </div>
      ),
      children:
        details.length > 0 ? (
          <Table<CardDetailRow>
            dataSource={details}
            columns={cardDetailColumns}
            rowKey="id"
            size="small"
            pagination={false}
            scroll={{ x: 560 }}
          />
        ) : (
          <Text type="secondary" style={{ fontSize: 12 }}>
            집계된 거래가 없습니다.
          </Text>
        ),
      styles: {
        body: { paddingTop: 8, paddingBottom: 12 },
      },
    };
  });
  const comparisonCardColumns: ColumnsType<CardCompanyTotalRow> = [
    {
      title: '카드사',
      dataIndex: 'source',
      key: 'source',
      width: 120,
      render: (v: CardCompanyTotalRow['source']) => <Tag>{v}</Tag>,
    },
    {
      title: '건수',
      dataIndex: 'count',
      key: 'count',
      width: 120,
      align: 'right',
      responsive: ['sm'],
      render: (v: number) => <Text>{v.toLocaleString()}건</Text>,
    },
    {
      title: '총 사용금액',
      dataIndex: 'amount',
      key: 'amount',
      align: 'right',
      width: 130,
      render: (v: number) => <Text strong>{fmt(v)}</Text>,
    },
  ];
  const comparisonBankColumns: ColumnsType<BankDetailRow> = [
    { title: '거래일', dataIndex: 'date', key: 'date', width: 120 },
    { title: '내용', dataIndex: 'merchant', key: 'merchant' },
    {
      title: '사용금액',
      dataIndex: 'amount',
      key: 'amount',
      align: 'right',
      width: 140,
      render: (v: number) => <Text strong>{fmt(v)}</Text>,
    },
  ];
  const savingsAllocationColumns: ColumnsType<SavingsAllocationItem> = [
    {
      title: '항목',
      dataIndex: 'name',
      key: 'name',
      render: (name: string, row: SavingsAllocationItem) => (
        <span>
          {row.emoji} {name}
        </span>
      ),
    },
    {
      title: '배정 금액',
      dataIndex: 'amount',
      key: 'amount',
      align: 'right',
      render: (v: number) => <Text strong>{fmt(v)}</Text>,
    },
  ];

  return (
    <div style={{ paddingBottom: 40 }}>
      <Row
        justify="space-between"
        align={isMobile ? 'top' : 'middle'}
        gutter={[8, 8]}
        style={{ marginBottom: 12 }}
      >
        <Col xs={24} sm="auto">
          <Title level={4} style={{ marginBottom: 0 }}>
            🔒 월 예산안
          </Title>
        </Col>
        <Col xs={24} sm="auto">
          <Space size="small" wrap>
            <Button
              size="small"
              icon={<LeftOutlined />}
              disabled={selectedIndex <= 0}
              onClick={() =>
                setSelectedMonth(
                  MONTH_OPTIONS[Math.max(0, selectedIndex - 1)].value,
                )
              }
            />
            <Select
              size="small"
              value={selectedMonth}
              onChange={setSelectedMonth}
              style={{ width: isMobile ? 130 : 150 }}
              options={MONTH_OPTIONS}
            />
            <Button
              size="small"
              icon={<RightOutlined />}
              disabled={
                selectedIndex < 0 || selectedIndex >= MONTH_OPTIONS.length - 1
              }
              onClick={() =>
                setSelectedMonth(
                  MONTH_OPTIONS[
                    Math.min(MONTH_OPTIONS.length - 1, selectedIndex + 1)
                  ].value,
                )
              }
            />
            <Button
              size="small"
              onClick={() => void refresh()}
              loading={loading}
            >
              동기화
            </Button>
          </Space>
        </Col>
      </Row>
      {error && (
        <Alert
          type="warning"
          showIcon
          style={{ marginBottom: 12 }}
          message="일부 데이터 동기화 실패"
          description={error}
        />
      )}
      <Text type="secondary" style={{ display: 'block', marginBottom: 16 }}>
        선택 월: {selectedLabel} · 마지막 동기화 {loadedAtText}
      </Text>
      {overBudgetItems.length > 0 && (
        <Alert
          type="warning"
          showIcon
          style={{ marginBottom: 12 }}
          message={`예산 초과 항목 ${overBudgetItems.length}건`}
          description={
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: 8,
                marginTop: 4,
              }}
            >
              {overBudgetItems.map((item) => (
                <div
                  key={item.name}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: '#fff1f2',
                    border: '1px solid #fecdd3',
                    borderRadius: 10,
                    padding: '8px 10px',
                  }}
                >
                  <Text strong style={{ color: '#9f1239' }}>{item.name}</Text>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      {fmt(item.actual)} / {fmt(item.budget)}
                    </Text>
                    <Text style={{ color: '#dc2626', fontWeight: 700 }}>
                      +{fmt(item.actual - item.budget)}
                    </Text>
                  </div>
                </div>
              ))}
            </div>
          }
        />
      )}

      <Row gutter={[14, 14]}>
        <Col xs={24} md={12}>
          <Card
            title={
              <>
                <span style={{ color: '#6366f1' }}>🏦</span> 은행 고정비 —{' '}
                {fmt(BANK_TOTAL)}
              </>
            }
            size="small"
          >
            <Table<BudgetItem>
              dataSource={bankFixed}
              columns={bankColumns}
              rowKey="key"
              pagination={false}
              size="small"
              footer={bankFooter}
              scroll={{ x: 620 }}
            />
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card
            title={
              <>
                <span style={{ color: '#22c55e' }}>💳</span> 카드 항목 —{' '}
                {fmt(CARD_TOTAL)}
              </>
            }
            size="small"
          >
            <Text
              type="secondary"
              style={{ fontSize: 11, display: 'block', marginBottom: 8 }}
            >
              안내: 관리비는 고정값이 아니라 실제 청구 금액 기준으로 매달 유동
              반영됩니다.
            </Text>
            <Collapse items={cardCollapseItems} bordered={false} />
            <div style={{ marginTop: 10 }}>{cardFooter()}</div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[14, 14]} style={{ marginTop: 14 }}>
        <Col xs={24}>
          <Card title="📉 카드 CSV vs 은행 CSV 실사용 비교" size="small">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: 0,
                  }}
                >
                  <Text>💳 카드 CSV 실사용</Text>
                  <Space size={8}>
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      예산 {fmt(CARD_TOTAL)}
                    </Text>
                    <Text strong>실사용 {fmt(liveCardCsvTotal)}</Text>
                  </Space>
                </div>
                <div
                  style={{
                    display: 'flex',
                    height: 10,
                    borderRadius: 999,
                    overflow: 'hidden',
                    background: '#e5e7eb',
                  }}
                >
                  <div
                    style={{
                      width: `${cardBar.green}%`,
                      background: '#22c55e',
                    }}
                  />
                  <div
                    style={{ width: `${cardBar.red}%`, background: '#ef4444' }}
                  />
                  <div
                    style={{ width: `${cardBar.gray}%`, background: '#e5e7eb' }}
                  />
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    marginTop: 2,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 11,
                      color: cardRate > 1 ? '#ef4444' : '#22c55e',
                    }}
                  >
                    {cardRate > 1
                      ? `예산 초과 ${fmt(liveCardCsvTotal - CARD_TOTAL)}`
                      : `예산 잔여 ${fmt(CARD_TOTAL - liveCardCsvTotal)}`}
                  </Text>
                </div>
                <Collapse
                  ghost
                  items={[
                    {
                      key: 'card-detail',
                      label: <Text strong>자세히 보기</Text>,
                      children: cardCompanyTotals.some(
                        (row) => row.count > 0,
                      ) ? (
                        <Table<CardCompanyTotalRow>
                          dataSource={cardCompanyTotals}
                          columns={comparisonCardColumns}
                          rowKey="key"
                          size="small"
                          pagination={false}
                          scroll={{ x: 420 }}
                        />
                      ) : (
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          카드 실사용 내역이 없습니다.
                        </Text>
                      ),
                    },
                  ]}
                />
              </div>
              <div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: 0,
                  }}
                >
                  <Text>🏦 은행 CSV 실사용</Text>
                  <Space size={8}>
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      예산 {fmt(BANK_TOTAL)}
                    </Text>
                    <Text strong>실사용 {fmt(liveBankCsvTotal)}</Text>
                  </Space>
                </div>
                <div
                  style={{
                    display: 'flex',
                    height: 10,
                    borderRadius: 999,
                    overflow: 'hidden',
                    background: '#e5e7eb',
                  }}
                >
                  <div
                    style={{
                      width: `${bankBar.green}%`,
                      background: '#6366f1',
                    }}
                  />
                  <div
                    style={{ width: `${bankBar.red}%`, background: '#ef4444' }}
                  />
                  <div
                    style={{ width: `${bankBar.gray}%`, background: '#e5e7eb' }}
                  />
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    marginTop: 2,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 11,
                      color: bankRate > 1 ? '#ef4444' : '#22c55e',
                    }}
                  >
                    {bankRate > 1
                      ? `예산 초과 ${fmt(liveBankCsvTotal - BANK_TOTAL)}`
                      : `예산 잔여 ${fmt(BANK_TOTAL - liveBankCsvTotal)}`}
                  </Text>
                </div>
              </div>
              <Collapse
                ghost
                items={[
                  {
                    key: 'bank-detail',
                    label: <Text strong>자세히 보기</Text>,
                    children:
                      bankComparisonRows.length > 0 ? (
                        <Table<BankDetailRow>
                          dataSource={bankComparisonRows}
                          columns={comparisonBankColumns}
                          rowKey="id"
                          size="small"
                          pagination={false}
                          scroll={{ x: 520 }}
                        />
                      ) : (
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          은행 실사용 내역이 없습니다.
                        </Text>
                      ),
                  },
                ]}
              />
            </div>
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card title="📅 특별예산 (연 1회)" size="small">
            <Table<SpecialBudgetItem>
              dataSource={specialBudget}
              columns={specialColumns}
              rowKey="key"
              pagination={false}
              size="small"
              scroll={{ x: 500 }}
              footer={() => (
                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <Text strong>연간 합계</Text>
                  <Text strong style={{ color: '#f59e0b' }}>
                    {fmt(specialBudget.reduce((s, i) => s + i.amount, 0))}
                  </Text>
                </div>
              )}
            />
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card title="📊 월 예산 요약" size="small">
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                padding: '8px 0',
              }}
            >
              {[
                {
                  label: '🏦 은행 고정비',
                  amount: BANK_TOTAL,
                  color: '#6366f1',
                },
                { label: '💳 카드 항목', amount: CARD_TOTAL, color: '#22c55e' },
              ].map(({ label, amount, color }) => (
                <div
                  key={label}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '8px 12px',
                    background: '#fafafa',
                    borderRadius: 8,
                  }}
                >
                  <Text>{label}</Text>
                  <Text strong style={{ color, fontSize: 15 }}>
                    {fmt(amount)}
                  </Text>
                </div>
              ))}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 12px',
                  background: '#f0f0ff',
                  borderRadius: 8,
                }}
              >
                <Text strong>📌 월 총 예산</Text>
                <Text strong style={{ fontSize: 18, color: '#4338ca' }}>
                  {fmt(MONTHLY_TOTAL)}
                </Text>
              </div>
              <Collapse
                ghost
                items={[
                  {
                    key: 'monthly-savings-detail',
                    label: (
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          width: '100%',
                          padding: '2px 0',
                        }}
                      >
                        <Text>💰 월 순저축</Text>
                        <Text
                          strong
                          style={{
                            color: expectedSavings >= 0 ? '#22c55e' : '#ef4444',
                            fontSize: 15,
                          }}
                        >
                          {expectedSavings >= 0 ? '+' : '-'}
                          {fmt(Math.abs(expectedSavings))}
                        </Text>
                      </div>
                    ),
                    children: (
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 8,
                          padding: '4px 8px 2px',
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Text type="secondary">월 수입 기준</Text>
                          <Text>{fmt(MONTHLY_INCOME)}</Text>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Text type="secondary">예산 기준 지출</Text>
                          <Text>-{fmt(MONTHLY_TOTAL)}</Text>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Text type="secondary">실사용 기준 지출</Text>
                          <Text>-{fmt(monthlyActualTotal)}</Text>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Text strong>실사용 기준 순저축</Text>
                          <Text
                            strong
                            style={{ color: actualSavings >= 0 ? '#22c55e' : '#ef4444' }}
                          >
                            {actualSavings >= 0 ? '+' : '-'}
                            {fmt(Math.abs(actualSavings))}
                          </Text>
                        </div>
                        <div
                          style={{
                            marginTop: 4,
                            paddingTop: 8,
                            borderTop: '1px dashed #d9d9d9',
                          }}
                        >
                          <Text strong style={{ display: 'block', marginBottom: 8 }}>
                            저축 분산 계획
                          </Text>
                          <Table<SavingsAllocationItem>
                            dataSource={savingsAllocations}
                            columns={savingsAllocationColumns}
                            rowKey="key"
                            size="small"
                            pagination={false}
                            scroll={{ x: 360 }}
                          />
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              marginTop: 8,
                            }}
                          >
                            <Text type="secondary">분산 배정 합계</Text>
                            <Text>{fmt(savingsAllocationTotal)}</Text>
                          </div>
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              marginTop: 2,
                            }}
                          >
                            <Text strong>예상 순저축 대비 잔여</Text>
                            <Text
                              strong
                              style={{
                                color: savingsAllocationGap >= 0 ? '#22c55e' : '#ef4444',
                              }}
                            >
                              {savingsAllocationGap >= 0 ? '+' : '-'}
                              {fmt(Math.abs(savingsAllocationGap))}
                            </Text>
                          </div>
                        </div>
                      </div>
                    ),
                  },
                ]}
              />
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 12px',
                  background: monthGap >= 0 ? '#f0fff4' : '#fff1f0',
                  borderRadius: 8,
                }}
              >
                <Text strong>✅ 실제 사용 합계 ({selectedLabel})</Text>
                <Text
                  strong
                  style={{
                    fontSize: 16,
                    color: monthGap >= 0 ? '#22c55e' : '#ef4444',
                  }}
                >
                  {fmt(monthlyActualTotal)}
                </Text>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '8px 12px',
                  background: monthGap >= 0 ? '#f6ffed' : '#fff2f0',
                  borderRadius: 8,
                }}
              >
                <Text>예산 대비 차이</Text>
                <Text
                  strong
                  style={{
                    color: monthGap >= 0 ? '#22c55e' : '#ef4444',
                    fontSize: 15,
                  }}
                >
                  {monthGap >= 0 ? '+' : '-'}
                  {fmt(Math.abs(monthGap))}
                </Text>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
