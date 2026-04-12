/**
 * 레이아웃 캔버스 배경 — `colorBgLayout`·첫 페인트(html)·테마 전환 시 동일 값 사용.
 * 가이드 색이 정해지면 이 상수만 수정하면 됨.
 *
 * 값은 Ant Design v5 기본 시드(라이트 #fff / 다크 #000)에서 나오는 `colorBgLayout`과 동일:
 * 라이트: `getSolidColor(#fff, 4)` → #f5f5f5, 다크: `getSolidColor(#000, 0)` → #000000
 */
export const LAYOUT_BG_LIGHT = "#f5f5f5";
export const LAYOUT_BG_DARK = "#000000";

export type LayoutChromeMode = "light" | "dark";

export function layoutBackgroundHex(mode: LayoutChromeMode): string {
  return mode === "dark" ? LAYOUT_BG_DARK : LAYOUT_BG_LIGHT;
}

/** `data-theme` + `documentElement` 배경 — shell `colorBgLayout`과 맞춤 */
export function syncDocumentLayoutBackground(mode: LayoutChromeMode) {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute("data-theme", mode);
  document.documentElement.style.backgroundColor = layoutBackgroundHex(mode);
}
