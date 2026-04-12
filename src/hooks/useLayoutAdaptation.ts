import { Grid } from "antd";
import { useEffect, useMemo, useState } from "react";

export type BreakpointKey = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";

export type LayoutAdaptation = {
  screens: Record<string, boolean>;
  /** xs만 true이거나 sm 미만 */
  isMobile: boolean;
  /** md 이상 */
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
    const isMobile = Boolean(screens.xs && !screens.sm);
    const isDesktop = Boolean(screens.md);
    return {
      screens: screens as Record<string, boolean>,
      isMobile,
      isDesktop,
      prefersReducedMotion,
    };
  }, [screens, prefersReducedMotion]);
}
