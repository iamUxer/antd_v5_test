export interface CashFlowRow {
  month: string;
  label: string;
  income: number;
  expense: number;
  net: number;
  balance: number;
  note?: string;
  isSpecial?: boolean;
  isFlip?: boolean;
  year: number;
}

export const INITIAL_BALANCE = -8_093_011;

export const baseCashFlowData: CashFlowRow[] = [
  { month: '6월',   label: '2026-06', year: 2026, income: 7_322_100, expense: 3_841_786, net: 3_480_314,  balance: -4_612_697, note: '급여+종소세환급 / 카드 초과분' },
  { month: '7월',   label: '2026-07', year: 2026, income: 6_220_000, expense: 4_705_871, net: 1_514_129,  balance: -3_098_568, note: '🏋️ 헬스장 100만원 청구', isSpecial: true },
  { month: '8월',   label: '2026-08', year: 2026, income: 6_220_000, expense: 4_305_871, net: 1_914_129,  balance: -1_184_439, note: '🚘 자동차보험료 60만원', isSpecial: true },
  { month: '9월',   label: '2026-09', year: 2026, income: 6_220_000, expense: 3_705_871, net: 2_514_129,  balance: 1_329_690,  note: '✅ 마이너스 통장 해소', isFlip: true },
  { month: '10월',  label: '2026-10', year: 2026, income: 6_220_000, expense: 3_705_871, net: 2_514_129,  balance: 3_843_819 },
  { month: '11월',  label: '2026-11', year: 2026, income: 6_220_000, expense: 3_705_871, net: 2_514_129,  balance: 6_357_948 },
  { month: '12월',  label: '2026-12', year: 2026, income: 6_220_000, expense: 3_705_871, net: 2_514_129,  balance: 8_872_077 },
  { month: '1월',   label: '2027-01', year: 2027, income: 6_220_000, expense: 4_139_611, net: 2_080_389,  balance: 10_952_466, note: '🚘 자동차세 433,740원', isSpecial: true },
  { month: '2월',   label: '2027-02', year: 2027, income: 6_220_000, expense: 3_705_871, net: 2_514_129,  balance: 13_466_595 },
  { month: '3월',   label: '2027-03', year: 2027, income: 6_220_000, expense: 3_705_871, net: 2_514_129,  balance: 15_980_724 },
  { month: '4월',   label: '2027-04', year: 2027, income: 6_220_000, expense: 3_705_871, net: 2_514_129,  balance: 18_494_853 },
  { month: '5월',   label: '2027-05', year: 2027, income: 6_220_000, expense: 3_705_871, net: 2_514_129,  balance: 21_008_982 },
  { month: '6월',   label: '2027-06', year: 2027, income: 6_220_000, expense: 3_705_871, net: 2_514_129,  balance: 23_523_111 },
  { month: '7월',   label: '2027-07', year: 2027, income: 6_220_000, expense: 4_705_871, net: 1_514_129,  balance: 25_037_240, note: '🏋️ 헬스장 연갱신', isSpecial: true },
  { month: '8월',   label: '2027-08', year: 2027, income: 6_220_000, expense: 4_305_871, net: 1_914_129,  balance: 26_951_369, note: '🚘 자동차보험료 60만원', isSpecial: true },
  { month: '9월',   label: '2027-09', year: 2027, income: 6_220_000, expense: 3_705_871, net: 2_514_129,  balance: 29_465_498 },
  { month: '10월',  label: '2027-10', year: 2027, income: 6_220_000, expense: 3_705_871, net: 2_514_129,  balance: 31_979_627 },
  { month: '11월',  label: '2027-11', year: 2027, income: 6_220_000, expense: 3_705_871, net: 2_514_129,  balance: 34_493_756 },
  { month: '12월',  label: '2027-12', year: 2027, income: 6_220_000, expense: 3_705_871, net: 2_514_129,  balance: 37_007_885 },
];

export const cashFlowData = baseCashFlowData;

export function applyExpenseDeltasToCashflow(
  base: CashFlowRow[],
  expenseDeltaByLabel: Record<string, number>,
): CashFlowRow[] {
  let runningBalance = INITIAL_BALANCE;
  let flipMarked = false;
  return base.map((row) => {
    const delta = expenseDeltaByLabel[row.label] ?? 0;
    const expense = row.expense + delta;
    const net = row.income - expense;
    runningBalance += net;
    let isFlip = false;
    if (!flipMarked && runningBalance >= 0) {
      isFlip = true;
      flipMarked = true;
    }
    return {
      ...row,
      expense,
      net,
      balance: runningBalance,
      isFlip,
    };
  });
}
