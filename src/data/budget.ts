export interface BudgetItem {
  key: string;
  name: string;
  emoji: string;
  amount: number;
  note?: string;
}

export interface SpecialBudgetItem extends BudgetItem {
  month: string;
  paymentMethod: 'bank' | 'card';
}

export interface SavingsAllocationItem {
  key: string;
  name: string;
  emoji: string;
  amount: number;
}

export const bankFixed: BudgetItem[] = [
  { key: 'rent', name: '월세', emoji: '🏠', amount: 1_045_800 },
  { key: 'bmw', name: 'BMW 할부', emoji: '🚗', amount: 697_821 },
  { key: 'loan', name: '대출 이자', emoji: '💸', amount: 175_000 },
  { key: 'kb_ins', name: 'KB 보험 (월납)', emoji: '🛡️', amount: 171_985 },
  { key: 'health', name: '건강보험', emoji: '🏥', amount: 77_000 },
  { key: 'pension', name: '국민연금', emoji: '🏛️', amount: 33_000 },
  { key: 'hana_ins', name: '손해보험 (하나)', emoji: '🛡️', amount: 20_280 },
  { key: 'donation', name: '기부/후원', emoji: '❤️', amount: 27_000 },
  { key: 'cuckoo', name: '쿠쿠 렌탈료', emoji: '💧', amount: 11_900 },
  { key: 'dues', name: '당비/회비', emoji: '🗳️', amount: 2_000 },
];

export const cardItems: BudgetItem[] = [
  { key: 'maint', name: '관리비', emoji: '🏠', amount: 250_000 },
  { key: 'skt', name: '통신 구독료', emoji: '📱', amount: 100_000 },
  { key: 'lucky', name: '럭키', emoji: '🐶', amount: 100_000 },
  { key: 'fuel', name: '주유/주차', emoji: '⛽', amount: 100_000 },
  { key: 'performance', name: '생산성/쇼핑', emoji: '✅', amount: 250_000 },
  { key: 'groceries', name: '식료품/생필품', emoji: '📦', amount: 300_000 },
  { key: 'dining', name: '점심/간식/외식', emoji: '🍽️', amount: 350_000 },
];

export const specialBudget: SpecialBudgetItem[] = [
  {
    key: 'gym',
    name: '헬스장 등록비',
    emoji: '🏋️',
    amount: 1_000_000,
    month: '6월',
    paymentMethod: 'card',
  },
  {
    key: 'car_ins',
    name: '자동차보험료',
    emoji: '🚘',
    amount: 600_000,
    month: '8월',
    paymentMethod: 'bank',
  },
  {
    key: 'car_tax',
    name: '자동차세',
    emoji: '🚘',
    amount: 433_740,
    month: '1월(내년)',
    paymentMethod: 'bank',
  },
];

export const savingsAllocations: SavingsAllocationItem[] = [
  { key: 'housing_sub', name: '청약저축', emoji: '🏦', amount: 50_000 },
  { key: 'lucky_saving', name: '럭키적금', emoji: '🐶', amount: 200_000 },
  { key: 'emergency', name: '예비비', emoji: '🛟', amount: 308_214 },
  { key: 'stock', name: '주식계좌', emoji: '📈', amount: 1_000_000 },
  { key: 'coin', name: '코인계좌', emoji: '🪙', amount: 900_000 },
];

export const BANK_TOTAL = bankFixed.reduce((s, i) => s + i.amount, 0);
export const CARD_TOTAL = cardItems.reduce((s, i) => s + i.amount, 0);
export const MONTHLY_TOTAL = BANK_TOTAL + CARD_TOTAL;
export const MONTHLY_INCOME = 6_220_000;
export const MONTHLY_SAVINGS = MONTHLY_INCOME - MONTHLY_TOTAL;
