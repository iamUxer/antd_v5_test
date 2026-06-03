export const SHINHAN_DRIVE_FILE_ID = '1TRfDOkLrl3_GwQVouG0U5yniBAS0xbXC';
export const KB_CARD_DRIVE_FILE_ID = '1kvQSnteaW9LNXPFw0-J8R9HA7r2DWJg8';
export const HYUNDAI_CARD_DRIVE_FILE_ID = '11uluyG7tJsdKxG-iNuLgFiMZqjYKsoMT';
export const SHINHAN_BANK_DRIVE_FILE_ID = '1iJvEJdoCpZurHb5IFSSqc8AQM9qH9OlS';

export type LiveCardTransaction = {
  id: string;
  date: string;
  merchant: string;
  amount: number;
  installment?: string;
  approvedTime?: string;
  raw: Record<string, string>;
};

export type LiveSpendingSnapshot = {
  sourceUrl: string;
  loadedAt: string;
  totalAmount: number;
  txCount: number;
  dateRange?: { from: string; to: string };
  transactions: LiveCardTransaction[];
};

export type LiveCsvSource = {
  name: string;
  fileId: string;
};

export function driveDownloadUrl(fileId: string): string {
  return `https://drive.google.com/uc?export=download&id=${fileId}`;
}

export function driveDirectContentUrl(fileId: string): string {
  return `https://drive.usercontent.google.com/download?id=${fileId}&export=download&confirm=t`;
}

export function driveProxyDirectUrl(fileId: string): string {
  return `/api/drive-download?id=${fileId}&export=download&confirm=t`;
}

export function driveProxyUcUrl(fileId: string): string {
  return `/api/drive-uc?export=download&id=${fileId}`;
}

function parseCsvLine(line: string): string[] {
  const fields: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const ch = line[i];
    if (ch === '"') {
      const next = line[i + 1];
      if (inQuotes && next === '"') {
        current += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }
    if (ch === ',' && !inQuotes) {
      fields.push(current.trim());
      current = '';
      continue;
    }
    current += ch;
  }
  fields.push(current.trim());
  return fields;
}

function parseCsv(text: string): string[][] {
  return text
    .replace(/^\uFEFF/, '')
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map(parseCsvLine);
}

function normalizeHeader(h: string): string {
  return h.replace(/\s+/g, '').toLowerCase();
}

function pickValue(row: Record<string, string>, candidates: string[]): string {
  for (const key of candidates) {
    if (row[key] != null && row[key] !== '') return row[key];
  }
  return '';
}

function parseAmount(value: string): number {
  const normalized = value.replace(/[^\d-]/g, '');
  if (!normalized) return 0;
  return Number.parseInt(normalized, 10);
}

function parseDateToSortable(value: string): string {
  const v = value.replace(/[.\-]/g, '/').trim();
  const m = v.match(/(\d{2,4})\D+(\d{1,2})\D+(\d{1,2})/);
  if (!m) return value;
  const y = m[1].length === 2 ? `20${m[1]}` : m[1];
  const mm = m[2].padStart(2, '0');
  const dd = m[3].padStart(2, '0');
  return `${y}-${mm}-${dd}`;
}

export async function loadShinhanCsvFromDrive(fileId = SHINHAN_DRIVE_FILE_ID): Promise<LiveSpendingSnapshot> {
  const candidates = [
    driveProxyDirectUrl(fileId),
    driveProxyUcUrl(fileId),
    driveDirectContentUrl(fileId),
    driveDownloadUrl(fileId),
  ];
  let sourceUrl = candidates[0];
  let text = '';
  let lastError: Error | null = null;

  for (const url of candidates) {
    sourceUrl = url;
    try {
      const res = await fetch(url);
      if (!res.ok) {
        lastError = new Error(`CSV 로드 실패 (${res.status})`);
        continue;
      }
      const body = await res.text();
      const maybeHtml = /^\s*</.test(body) && body.toLowerCase().includes('<html');
      if (maybeHtml) {
        lastError = new Error('CSV 대신 HTML 응답을 받아 파싱할 수 없습니다. 공유 링크/권한을 확인하세요.');
        continue;
      }
      text = body;
      lastError = null;
      break;
    } catch (e) {
      lastError = e instanceof Error ? e : new Error('CSV 네트워크 요청 실패');
    }
  }

  if (!text) {
    throw lastError ?? new Error('CSV 로드 실패');
  }

  const rows = parseCsv(text);
  if (rows.length === 0) {
    throw new Error('CSV 데이터가 비어 있습니다.');
  }
  if (rows.length === 1) {
    return {
      sourceUrl,
      loadedAt: new Date().toISOString(),
      totalAmount: 0,
      txCount: 0,
      dateRange: undefined,
      transactions: [],
    };
  }

  const header = rows[0].map(normalizeHeader);
  const dataRows = rows.slice(1);

  const txs: LiveCardTransaction[] = dataRows
    .map((row, idx) => {
      const rec: Record<string, string> = {};
      header.forEach((h, i) => {
        rec[h] = (row[i] ?? '').trim();
      });

      const date = pickValue(rec, [
        '거래일',
        '승인일자',
        '이용일자',
        '거래일자',
        '매입일자',
        'date',
      ]);
      const merchant = pickValue(rec, [
        '가맹점명',
        '이용처',
        '사용처',
        '내용',
        'merchant',
        '가맹점',
      ]);
      const amountStr = pickValue(rec, [
        '이용금액',
        '승인금액',
        '결제금액',
        '출금(원)',
        '출금',
        '금액',
        'amount',
      ]);
      const installment = pickValue(rec, ['할부', '할부개월', '일시불할부', 'installment']);
      const approvedTime = pickValue(rec, ['승인시각', '승인시간', '거래시각', 'time']);
      const amount = parseAmount(amountStr);

      return {
        id: `${date || 'unknown'}-${merchant || 'unknown'}-${amount}-${idx}`,
        date: date || '-',
        merchant: merchant || '(미확인 가맹점)',
        amount,
        installment: installment || undefined,
        approvedTime: approvedTime || undefined,
        raw: rec,
      };
    })
    .filter((tx) => tx.amount !== 0)
    .sort((a, b) => parseDateToSortable(b.date).localeCompare(parseDateToSortable(a.date)));

  const totalAmount = txs.reduce((sum, tx) => sum + tx.amount, 0);
  const dates = txs.map((tx) => parseDateToSortable(tx.date)).filter(Boolean).sort();
  const dateRange = dates.length > 0 ? { from: dates[0], to: dates[dates.length - 1] } : undefined;

  return {
    sourceUrl,
    loadedAt: new Date().toISOString(),
    totalAmount,
    txCount: txs.length,
    dateRange,
    transactions: txs,
  };
}

export async function loadCsvFromDrive(fileId: string): Promise<LiveSpendingSnapshot> {
  return loadShinhanCsvFromDrive(fileId);
}

export async function loadMultipleCsvFromDrive(sources: LiveCsvSource[]): Promise<Record<string, LiveSpendingSnapshot>> {
  const entries = await Promise.all(
    sources.map(async (src) => {
      const snapshot = await loadCsvFromDrive(src.fileId);
      return [src.name, snapshot] as const;
    }),
  );
  return Object.fromEntries(entries);
}
