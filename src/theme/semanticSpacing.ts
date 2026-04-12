import type { AppDesignToken } from "@/theme/appDesignToken";

/**
 * 토큰 → 의미 상수(페이지·레이아웃 단일 읽기용)
 */
export function semanticSpacing(token: AppDesignToken) {
  return {
    page: token.paddingLG,
    pageCompact: token.paddingSM,
    sectionGap: token.marginLG,
    inlineGap: token.marginSM,
  } as const;
}
