import { useMemo } from 'react';
import { MONTHLY_TOTAL } from '@/data/budget';
import {
  applyExpenseDeltasToCashflow,
  baseCashFlowData,
  type CashFlowRow,
} from '@/data/cashflow';
import { useLiveFinanceData } from '@/hooks/useLiveFinanceData';
import type { LiveCardTransaction } from '@/data/liveSpending';

type MonthActual = {
  cardUsage: number;
  bankUsage: number;
  monthlyTotalUsage: number;
  hasLiveData: boolean;
};

function parseTxDate(value: string): Date | null {
  const m = value.trim().match(/(\d{2,4})\D+(\d{1,2})\D+(\d{1,2})/);
  if (!m) return null;
  const y = m[1].length === 2 ? Number(`20${m[1]}`) : Number(m[1]);
  const mm = Number(m[2]);
  const dd = Number(m[3]);
  if (!Number.isFinite(y) || !Number.isFinite(mm) || !Number.isFinite(dd)) return null;
  return new Date(y, mm - 1, dd);
}

function getBillingCycleRange(selectedMonth: string, startDay: number, endDay: number) {
  const [yearStr, monthStr] = selectedMonth.split('-');
  const year = Number(yearStr);
  const month = Number(monthStr);
  const start = new Date(year, month - 2, startDay);
  const end = new Date(year, month - 1, endDay);
  return { start, end };
}

function filterByDateRange(txs: LiveCardTransaction[], start: Date, end: Date): LiveCardTransaction[] {
  return txs.filter((tx) => {
    const d = parseTxDate(tx.date);
    return d ? d >= start && d <= end : false;
  });
}

function toYearMonth(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

export function useAdjustedCashflow(): {
  cashflow: CashFlowRow[];
  monthActualByLabel: Record<string, MonthActual>;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  loadedAtText: string;
} {
  const { data, loading, error, refresh, loadedAtText } = useLiveFinanceData();

  const monthActualByLabel = useMemo(() => {
    const result: Record<string, MonthActual> = {};
    const shinhanTxs = data.shinhanCard?.transactions ?? [];
    const kbTxs = data.kbCard?.transactions ?? [];
    const hyundaiTxs = data.hyundaiCard?.transactions ?? [];
    const bankTxs = data.shinhanBank?.transactions ?? [];

    baseCashFlowData.forEach((row) => {
      const shinhanKbRange = getBillingCycleRange(row.label, 12, 11);
      const hyundaiRange = getBillingCycleRange(row.label, 14, 13);

      const shinhanCycle = filterByDateRange(shinhanTxs, shinhanKbRange.start, shinhanKbRange.end);
      const kbCycle = filterByDateRange(kbTxs, shinhanKbRange.start, shinhanKbRange.end);
      const hyundaiCycle = filterByDateRange(hyundaiTxs, hyundaiRange.start, hyundaiRange.end);
      const bankMonth = bankTxs.filter((tx) => {
        const d = parseTxDate(tx.date);
        return d ? toYearMonth(d) === row.label : false;
      });

      const cardUsage = [...shinhanCycle, ...kbCycle, ...hyundaiCycle].reduce((sum, tx) => sum + tx.amount, 0);
      const bankUsage = bankMonth.reduce((sum, tx) => sum + tx.amount, 0);
      const hasLiveData = shinhanCycle.length + kbCycle.length + hyundaiCycle.length + bankMonth.length > 0;

      result[row.label] = {
        cardUsage,
        bankUsage,
        monthlyTotalUsage: cardUsage + bankUsage,
        hasLiveData,
      };
    });
    return result;
  }, [data.hyundaiCard?.transactions, data.kbCard?.transactions, data.shinhanBank?.transactions, data.shinhanCard?.transactions]);

  const cashflow = useMemo(() => {
    const deltas: Record<string, number> = {};
    Object.entries(monthActualByLabel).forEach(([label, actual]) => {
      if (actual.hasLiveData) {
        deltas[label] = actual.monthlyTotalUsage - MONTHLY_TOTAL;
      }
    });
    return applyExpenseDeltasToCashflow(baseCashFlowData, deltas);
  }, [monthActualByLabel]);

  return {
    cashflow,
    monthActualByLabel,
    loading,
    error,
    refresh,
    loadedAtText,
  };
}
