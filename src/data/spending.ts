export interface SpendingCategory {
  key: string;
  name: string;
  emoji: string;
  annual: number;
  monthly: number;
  count: number;
  card: '신한' | '국민' | '현대' | '복합';
  topMerchants?: { name: string; amount: number }[];
  monthlyBreakdown?: Record<string, number>;
}

export const spendingCategories: SpendingCategory[] = [
  {
    key: 'online_shop', name: '온라인쇼핑', emoji: '📦', annual: 5_811_977, monthly: 484_331, count: 256, card: '국민',
    topMerchants: [{ name: '쿠팡(쿠페이)', amount: 3_200_000 }, { name: '쿠팡이츠', amount: 1_800_000 }, { name: '컬리', amount: 400_000 }],
  },
  {
    key: 'toll', name: '통행료/교통', emoji: '🚘', annual: 3_124_616, monthly: 260_385, count: 150, card: '신한',
    topMerchants: [{ name: '한국도로공사', amount: 2_000_000 }, { name: '용서고속도로', amount: 600_000 }, { name: '경수고속도로', amount: 200_000 }],
  },
  {
    key: 'shopping', name: '쇼핑/의류', emoji: '👕', annual: 2_105_931, monthly: 175_494, count: 22, card: '신한',
    topMerchants: [{ name: '무신사', amount: 700_000 }, { name: '유니클로', amount: 400_000 }, { name: '나이키', amount: 300_000 }],
  },
  {
    key: 'medical', name: '의료/약국', emoji: '🏥', annual: 1_965_400, monthly: 163_783, count: 24, card: '신한',
    topMerchants: [{ name: '리지정신건강의학과', amount: 900_000 }, { name: '각종 약국', amount: 500_000 }],
  },
  {
    key: 'housing', name: '주거관리비', emoji: '🏠', annual: 1_948_120, monthly: 162_343, count: 9, card: '신한',
    topMerchants: [{ name: '광교센트럴푸 관리비', amount: 1_948_120 }],
  },
  {
    key: 'online_sub', name: '온라인/기타', emoji: '🖥️', annual: 1_888_820, monthly: 157_402, count: 44, card: '복합' },
  {
    key: 'delivery', name: '배달음식', emoji: '🛵', annual: 1_473_087, monthly: 122_757, count: 75, card: '국민',
    topMerchants: [{ name: '쿠팡이츠', amount: 900_000 }, { name: '배달의민족', amount: 400_000 }],
  },
  {
    key: 'restaurant', name: '외식/식당', emoji: '🍽️', annual: 1_390_200, monthly: 115_850, count: 49, card: '신한',
    topMerchants: [{ name: '아워홈 두산타워', amount: 456_000 }, { name: '각종 식당', amount: 600_000 }],
  },
  {
    key: 'fuel', name: '주유비', emoji: '⛽', annual: 1_209_000, monthly: 100_750, count: 23, card: '신한' },
  {
    key: 'telecom', name: '통신비 (SKT)', emoji: '📱', annual: 740_900, monthly: 61_742, count: 12, card: '현대',
    topMerchants: [{ name: 'SKT 월정액', amount: 740_900 }],
  },
  {
    key: 'parking', name: '주차비', emoji: '🅿️', annual: 868_900, monthly: 72_408, count: 22, card: '신한' },
  {
    key: 'mart', name: '마트/슈퍼', emoji: '🛒', annual: 549_810, monthly: 45_818, count: 12, card: '신한' },
  {
    key: 'pet', name: '반려동물 (럭키)', emoji: '🐶', annual: 471_800, monthly: 39_317, count: 9, card: '신한' },
  {
    key: 'culture', name: '문화/여가', emoji: '🎬', annual: 331_060, monthly: 27_588, count: 33, card: '복합' },
  {
    key: 'cafe', name: '카페/음료', emoji: '☕', annual: 257_330, monthly: 21_444, count: 47, card: '신한' },
  {
    key: 'convenience', name: '편의점', emoji: '🏪', annual: 255_470, monthly: 21_289, count: 42, card: '복합' },
  {
    key: 'beauty', name: '미용/뷰티', emoji: '💇', annual: 207_770, monthly: 17_314, count: 3, card: '신한' },
];

export const CARD_ANNUAL_TOTAL = 23_652_845;
export const CARD_MONTHLY_AVG = Math.round(CARD_ANNUAL_TOTAL / 12);

export const cardSummary = [
  { name: '신한카드', annual: 14_407_646, count: 491, color: '#6366f1' },
  { name: '국민카드', annual: 8_318_379,  count: 370, color: '#22c55e' },
  { name: '현대카드', annual: 926_820,    count: 44,  color: '#f59e0b' },
];

export const monthlyCardData = [
  { month: '1월',  신한: 2_087_300, 국민: 762_604, 현대: 0 },
  { month: '2월',  신한: 283_800,   국민: 636_062, 현대: 0 },
  { month: '3월',  신한: 235_362,   국민: 253_178, 현대: 0 },
  { month: '4월',  신한: 194_457,   국민: 369_014, 현대: 79_190 },
  { month: '5월',  신한: 583_056,   국민: 740_987, 현대: 67_430 },
  { month: '6월',  신한: 792_240,   국민: 883_719, 현대: 64_240 },
  { month: '7월',  신한: 1_599_630, 국민: 757_274, 현대: 61_630 },
  { month: '8월',  신한: 2_633_809, 국민: 739_247, 현대: 61_630 },
  { month: '9월',  신한: 1_704_931, 국민: 895_690, 현대: 31_360 },
  { month: '10월', 신한: 1_400_981, 국민: 930_486, 현대: 61_630 },
  { month: '11월', 신한: 1_687_990, 국민: 729_308, 현대: 61_630 },
  { month: '12월', 신한: 1_204_090, 국민: 620_810, 현대: 61_630 },
];
