import { Grid } from "antd";
import { useEffect, useMemo, useState } from "react";

export type BreakpointKey = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";

export type LayoutAdaptation = {
  screens: Record<string, boolean>;
  /** lg 미만 (모바일/태블릿 포함) */
  isMobile: boolean;
  /** lg 이상 */
  isDesktop: boolean;
  prefersReducedMotion: boolean;
};

/**
 * 뷰포트·접근성 상태를 스타일 함수에 주입하기 위한 훅.
 * 컨테이너 쿼리가 필요하면 추후 LayoutContext + ResizeObserver로 확장.
 */
export function useLayoutAdaptation(): LayoutAdaptation {
  const screens = Grid.useBreakpoint();

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return useMemo(() => {
    // 1024px(lg) 미만은 모두 모바일 레이아웃으로 취급
    const isMobile = !screens.lg;
    const isDesktop = Boolean(screens.lg);
    return {
      screens: screens as Record<string, boolean>,
      isMobile,
      isDesktop,
      prefersReducedMotion,
    };
  }, [screens, prefersReducedMotion]);
}
