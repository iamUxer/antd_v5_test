import type { CSSProperties } from "react";
import type { AppDesignToken } from "@/theme/appDesignToken";
import type { LayoutAdaptation } from "@/hooks/useLayoutAdaptation";

export function createDemoHomeStyles(
  token: AppDesignToken,
  layout: LayoutAdaptation,
): Record<string, CSSProperties> {
  const cols = layout.isMobile ? 1 : layout.screens.lg ? 3 : 2;
  return {
    stack: {
      display: "flex",
      flexDirection: "column",
      gap: token.marginLG,
    },
    intro: {
      display: "flex",
      flexDirection: "column",
      gap: token.marginSM,
    },
    introTitle: {
      color: token.colorTextHeading,
    },
    introLead: {
      color: token.colorTextSecondary,
    },
    cardList: {
      display: "grid",
      gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
      gap: token.margin,
      listStyle: "none",
      margin: 0,
      padding: 0,
    },
    cardListItem: {
      display: "flex",
      minWidth: 0,
    },
    card: {
      padding: layout.isMobile ? token.paddingSM : token.padding,
      borderRadius: token.borderRadiusLG,
      border: `${token.lineWidth}px solid ${token.colorBorderSecondary}`,
      background: token.colorBgContainer,
      flex: 1,
      minWidth: 0,
    },
    cardHeading: {
      color: token.colorTextHeading,
    },
    cardLead: {
      color: token.colorTextSecondary,
    },
  };
}
