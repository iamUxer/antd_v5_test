import type { CSSProperties } from "react";
import type { LayoutAdaptation } from "@/hooks/useLayoutAdaptation";
import type { AppDesignToken } from "@/theme/appDesignToken";
import { semanticSpacing } from "@/theme/semanticSpacing";

export type AppShellStyleFnParams = {
  token: AppDesignToken;
  layout: LayoutAdaptation;
};

/**
 * 스타일 객체는 컴포넌트에서 useMemo로 감싸 참조 안정화.
 */
export function createAppShellStyles({
  token,
  layout,
}: AppShellStyleFnParams): Record<string, CSSProperties> {
  const space = semanticSpacing(token);
  const { isMobile } = layout;

  return {
    shell: {
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      background: token.colorBgLayout,
      color: token.colorText,
    },
    header: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: `0 ${isMobile ? space.pageCompact : space.page}px`,
      height: isMobile ? 52 : 56,
      borderBottom: `${token.lineWidth}px solid ${token.colorBorderSecondary}`,
      background: token.colorBgContainer,
    },
    brand: {
      fontSize: token.fontSizeLG,
      fontWeight: token.fontWeightStrong,
      color: "inherit",
      textDecoration: "none",
    },
    headerActions: {
      display: "flex",
      alignItems: "center",
      gap: token.marginSM,
    },
    body: {
      flex: 1,
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      minHeight: 0,
    },
    sider: {
      width: isMobile ? 0 : 220,
      flexShrink: 0,
      borderRight: isMobile
        ? "none"
        : `${token.lineWidth}px solid ${token.colorBorderSecondary}`,
      background: token.colorBgContainer,
      overflow: "hidden",
    },
    siderInner: {
      width: 220,
      padding: `${token.paddingSM}px ${token.padding}px`,
    },
    main: {
      flex: 1,
      minWidth: 0,
      padding: isMobile ? space.pageCompact : space.page,
      overflow: "auto",
    },
  };
}
