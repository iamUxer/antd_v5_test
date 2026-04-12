/**
 * UI 스케일: 폰트·간격 등은 기준값 × scale. 1px 보더·미세 정렬은 스케일 제외.
 */
export const DEFAULT_UI_SCALE = 1;

export function scaled(
  basePx: number,
  scale: number,
  options?: { noScale?: boolean },
): number {
  if (options?.noScale) return basePx;
  const v = basePx * scale;
  return Math.max(0, Math.round(v * 100) / 100);
}

/** 보더·헤어라인: 항상 논스케일 */
export const hairline = (px: 1 | 2 = 1) => px;
