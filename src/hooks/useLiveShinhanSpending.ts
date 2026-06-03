import { useCallback, useEffect, useMemo, useState } from 'react';
import { loadShinhanCsvFromDrive, type LiveSpendingSnapshot } from '@/data/liveSpending';

type UseLiveShinhanSpendingResult = {
  data: LiveSpendingSnapshot | null;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  loadedAtText: string;
};

export function useLiveShinhanSpending(): UseLiveShinhanSpendingResult {
  const [data, setData] = useState<LiveSpendingSnapshot | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const snapshot = await loadShinhanCsvFromDrive();
      setData(snapshot);
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'CSV 동기화 중 오류가 발생했습니다.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const loadedAtText = useMemo(() => {
    if (!data) return '-';
    return new Date(data.loadedAt).toLocaleString('ko-KR');
  }, [data]);

  return {
    data,
    loading,
    error,
    refresh,
    loadedAtText,
  };
}
