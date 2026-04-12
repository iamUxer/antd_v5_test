import { theme } from "antd";
import type { GlobalToken } from "antd/es/theme/interface";

/**
 * `theme.useToken().token`과 동일한 값. IDE 호버용 JSDoc만 프로젝트 기준으로 둠
 * (antd `GlobalToken`의 @nameZH / 중국어 @desc 숨김).
 */
export interface AppDesignToken {
  /** 레이아웃·페이지 배경색 */
  colorBgLayout: string;
  /** 기본 본문 텍스트 색 */
  colorText: string;
  /** 테두리 두께(px) */
  lineWidth: number;
  /** 보조 테두리 색 */
  colorBorderSecondary: string;
  /** 카드·헤더 등 컨테이너 배경 */
  colorBgContainer: string;
  /** 큰 글씨 크기 */
  fontSizeLG: number;
  /** 강조 굵기(제목 등) */
  fontWeightStrong: number;
  /** 작은 바깥 여백 */
  marginSM: number;
  /** 작은 안쪽 여백 */
  paddingSM: number;
  /** 기본 안쪽 여백 */
  padding: number;
  /** 큰 바깥 여백 */
  marginLG: number;
  /** 제목·강조 텍스트 색 */
  colorTextHeading: string;
  /** 보조 설명 텍스트 색 */
  colorTextSecondary: string;
  /** 기본 바깥 여백 */
  margin: number;
  /** 아주 작은 바깥 여백 */
  marginXS: number;
  /** 큰 모서리 둥글기 */
  borderRadiusLG: number;
  /** 큰 안쪽 여백 */
  paddingLG: number;
}

export function toAppDesignToken(token: GlobalToken): AppDesignToken {
  return token as unknown as AppDesignToken;
}

/** `theme.useToken()`과 동일하되 `token`만 `AppDesignToken`으로 캐스팅 */
export function useAppDesignToken() {
  const ctx = theme.useToken();
  return {
    ...ctx,
    token: toAppDesignToken(ctx.token),
  };
}

/**
 * `ConfigProvider` / `ThemeConfig`의 `token`에 넣는 오버라이드.
 * 객체를 이 타입으로 두면 IDE 호버에 antd 중국어 JSDoc 대신 아래 주석이 쓰임.
 */
export interface AppThemeTokenPatch {
  /** 브랜드 주요 색 */
  colorPrimary: string;
  /** 레이아웃·페이지 배경 (`canvasBackground` 단일 출처와 동일) */
  colorBgLayout: string;
  /** 기본 본문 글자 크기(px) */
  fontSize: number;
  /** 큰 글자 크기(px) */
  fontSizeLG: number;
  /** 작은 글자 크기(px) */
  fontSizeSM: number;
  /** 기본 안쪽 여백(px) */
  padding: number;
  /** 작은 안쪽 여백(px) */
  paddingSM: number;
  /** 큰 안쪽 여백(px) */
  paddingLG: number;
  /** 아주 작은 안쪽 여백(px) */
  paddingXS: number;
  /** 기본 바깥 여백(px) */
  margin: number;
  /** 작은 바깥 여백(px) */
  marginSM: number;
  /** 큰 바깥 여백(px) */
  marginLG: number;
  /** 아주 작은 바깥 여백(px) */
  marginXS: number;
  /** 기본 모서리 둥글기(px) */
  borderRadius: number;
  /** 큰 모서리 둥글기(px) */
  borderRadiusLG: number;
  /** 작은 모서리 둥글기(px) */
  borderRadiusSM: number;
  /** 얇은 테두리 두께(px) */
  lineWidth: number;
  /** 굵은 테두리 두께(px) */
  lineWidthBold: number;
  /** 기본 컨트롤 높이(px) */
  controlHeight: number;
  /** 큰 컨트롤 높이(px) */
  controlHeightLG: number;
  /** 작은 컨트롤 높이(px) */
  controlHeightSM: number;
}
