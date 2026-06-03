import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  HYUNDAI_CARD_DRIVE_FILE_ID,
  KB_CARD_DRIVE_FILE_ID,
  SHINHAN_BANK_DRIVE_FILE_ID,
  SHINHAN_DRIVE_FILE_ID,
  loadCsvFromDrive,
  type LiveSpendingSnapshot,
} from '@/data/liveSpending';

type SourceKey = 'shinhanCard' | 'kbCard' | 'hyundaiCard' | 'shinhanBank';

type UseLiveFinanceDataResult = {
  data: Partial<Record<SourceKey, LiveSpendingSnapshot>>;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  loadedAtText: string;
  cardTotal: number;
};

const SOURCES: { key: SourceKey; name: string; fileId: string }[] = [
  { key: 'shinhanCard', name: 'shinhanCard', fileId: SHINHAN_DRIVE_FILE_ID },
  { key: 'kbCard', name: 'kbCard', fileId: KB_CARD_DRIVE_FILE_ID },
  { key: 'hyundaiCard', name: 'hyundaiCard', fileId: HYUNDAI_CARD_DRIVE_FILE_ID },
  { key: 'shinhanBank', name: 'shinhanBank', fileId: SHINHAN_BANK_DRIVE_FILE_ID },
];

export function useLiveFinanceData(): UseLiveFinanceDataResult {
  const [data, setData] = useState<Partial<Record<SourceKey, LiveSpendingSnapshot>>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    const results = await Promise.allSettled(
      SOURCES.map(async (s) => ({
        key: s.key,
        snapshot: await loadCsvFromDrive(s.fileId),
      })),
    );

    const next: Partial<Record<SourceKey, LiveSpendingSnapshot>> = {};
    const failed: string[] = [];

    for (let i = 0; i < results.length; i += 1) {
      const result = results[i];
      const source = SOURCES[i];
      if (result.status === 'fulfilled') {
        next[result.value.key] = result.value.snapshot;
      } else {
        failed.push(source.name);
      }
    }

    setData(next);
    if (failed.length > 0) {
      setError(`일부 동기화 실패: ${failed.join(', ')} (공유 권한/링크 확인 필요)`);
    } else {
      setError(null);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const loadedAtText = useMemo(() => {
    const all = Object.values(data).map((d) => d?.loadedAt).filter(Boolean) as string[];
    if (all.length === 0) return '-';
    const latest = all.sort().at(-1)!;
    return new Date(latest).toLocaleString('ko-KR');
  }, [data]);

  const cardTotal = useMemo(() => {
    return (data.shinhanCard?.totalAmount ?? 0)
      + (data.kbCard?.totalAmount ?? 0)
      + (data.hyundaiCard?.totalAmount ?? 0);
  }, [data.hyundaiCard?.totalAmount, data.kbCard?.totalAmount, data.shinhanCard?.totalAmount]);

  return {
    data,
    loading,
    error,
    refresh,
    loadedAtText,
    cardTotal,
  };
}
