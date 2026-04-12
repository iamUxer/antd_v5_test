import { Button, Space, Typography } from "antd";
import { useMemo, type ReactNode } from "react";
import { useLayoutAdaptation } from "@/hooks/useLayoutAdaptation";
import { useAppTheme } from "@/providers/AppThemeProvider";
import { useAppDesignToken } from "@/theme/appDesignToken";
import { createAppShellStyles } from "./AppShell.style";

const { Text } = Typography;

type Props = { children: ReactNode };

export function AppShell({ children }: Props) {
  const { token } = useAppDesignToken();
  const layout = useLayoutAdaptation();
  const { mode, setMode, uiScale, setUiScale } = useAppTheme();

  const styles = useMemo(
    () => createAppShellStyles({ token, layout }),
    [token, layout],
  );

  return (
    <div style={styles.shell}>
      <header style={styles.header}>
        <a href="/" style={styles.brand} aria-label="홈으로 이동">
          App
        </a>
        <div style={styles.headerActions}>
          <Space size="small" wrap>
            <Text type="secondary">
              scale {uiScale.toFixed(2)}
            </Text>
            <Button
              size="small"
              onClick={() => setUiScale(uiScale <= 0.9 ? 1 : 0.88)}
            >
              토글 스케일
            </Button>
            <Button size="small" onClick={() => setMode(mode === "dark" ? "light" : "dark")}>
              {mode === "dark" ? "라이트" : "다크"}
            </Button>
          </Space>
        </div>
      </header>
      <div style={styles.body}>
        {!layout.isMobile && (
          <aside style={styles.sider} aria-label="사이드 내비게이션">
            <nav style={styles.siderInner}>
              <Text>사이드바 (md+)</Text>
            </nav>
          </aside>
        )}
        <main id="app-main" style={styles.main} tabIndex={-1}>
          {children}
        </main>
      </div>
    </div>
  );
}
