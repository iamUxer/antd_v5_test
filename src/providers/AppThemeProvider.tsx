import { App, ConfigProvider } from "antd";
import koKR from "antd/locale/ko_KR";
import type { ReactNode } from "react";
import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { syncDocumentLayoutBackground } from "@/theme/canvasBackground";
import { createAppTheme, type ThemeMode } from "@/theme/createAppTheme";
import { DEFAULT_UI_SCALE } from "@/theme/scale";
import { STORAGE_THEME_MODE, STORAGE_UI_SCALE } from "@/theme/storageKeys";

type ThemeContextValue = {
  mode: ThemeMode;
  setMode: (m: ThemeMode) => void;
  uiScale: number;
  setUiScale: (s: number) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function readStoredMode(): ThemeMode {
  try {
    const v = localStorage.getItem(STORAGE_THEME_MODE);
    if (v === "dark" || v === "light") return v;
  } catch {
    /* ignore */
  }
  return "light";
}

function readStoredScale(): number {
  try {
    const v = localStorage.getItem(STORAGE_UI_SCALE);
    const n = v ? Number(v) : NaN;
    if (Number.isFinite(n) && n >= 0.85 && n <= 1.25) return n;
  } catch {
    /* ignore */
  }
  return DEFAULT_UI_SCALE;
}

type Props = { children: ReactNode };

export function AppThemeProvider({ children }: Props) {
  const [mode, setModeState] = useState<ThemeMode>(() => {
    const m = readStoredMode();
    syncDocumentLayoutBackground(m);
    return m;
  });
  const [uiScale, setUiScaleState] = useState(readStoredScale);

  const setMode = useCallback((m: ThemeMode) => {
    setModeState(m);
    try {
      localStorage.setItem(STORAGE_THEME_MODE, m);
    } catch {
      /* ignore */
    }
    syncDocumentLayoutBackground(m);
  }, []);

  const setUiScale = useCallback((s: number) => {
    setUiScaleState(s);
    try {
      localStorage.setItem(STORAGE_UI_SCALE, String(s));
    } catch {
      /* ignore */
    }
  }, []);

  const theme = useMemo(
    () => createAppTheme({ mode, uiScale }),
    [mode, uiScale],
  );

  const ctx = useMemo<ThemeContextValue>(
    () => ({ mode, setMode, uiScale, setUiScale }),
    [mode, setMode, uiScale, setUiScale],
  );

  return (
    <ThemeContext.Provider value={ctx}>
      <ConfigProvider locale={koKR} theme={theme}>
        <App style={{ minHeight: "100vh", background: "transparent" }}>{children}</App>
      </ConfigProvider>
    </ThemeContext.Provider>
  );
}

export function useAppTheme() {
  const v = useContext(ThemeContext);
  if (!v) throw new Error("useAppTheme must be used within AppThemeProvider");
  return v;
}
