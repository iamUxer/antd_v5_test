import type { ThemeConfig } from "antd";
import { theme as antdTheme } from "antd";

const { defaultAlgorithm, darkAlgorithm } = antdTheme;
import type { AppThemeTokenPatch } from "./appDesignToken";
import { layoutBackgroundHex } from "./canvasBackground";
import { hairline, scaled } from "./scale";

export type ThemeMode = "light" | "dark";

export function createAppTheme(options: {
  mode: ThemeMode;
  /** 레이아웃·타이포 스케일 (Antd token 파생에 사용) */
  uiScale: number;
}): ThemeConfig {
  const { mode, uiScale } = options;
  const s = (n: number) => scaled(n, uiScale);

  const token: AppThemeTokenPatch = {
    colorPrimary: "#1677ff",
    colorBgLayout: layoutBackgroundHex(mode),
    fontSize: s(14),
    fontSizeLG: s(16),
    fontSizeSM: s(12),
    padding: s(16),
    paddingSM: s(12),
    paddingLG: s(24),
    paddingXS: s(8),
    margin: s(16),
    marginSM: s(8),
    marginLG: s(24),
    marginXS: s(8),
    borderRadius: s(6),
    borderRadiusLG: s(8),
    borderRadiusSM: s(4),
    /** 1px 계열은 스케일 제외 (깨짐·블러 방지) */
    lineWidth: hairline(1),
    lineWidthBold: hairline(2),
    controlHeight: s(32),
    controlHeightLG: s(40),
    controlHeightSM: s(24),
  };

  return {
    algorithm: mode === "dark" ? darkAlgorithm : defaultAlgorithm,
    token,
    components: {
      /** 빌트인 예외 조정 전용 — 전역 수치는 token 우선 */
      Button: {
        borderRadius: s(6),
        controlHeight: s(36),
      },
      Input: {
        borderRadius: s(6),
      },
    },
  };
}
