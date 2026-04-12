import { Button, Typography } from "antd";
import { useMemo } from "react";
import { useLayoutAdaptation } from "@/hooks/useLayoutAdaptation";
import { useAppDesignToken } from "@/theme/appDesignToken";
import { createDemoHomeStyles } from "./DemoHome.style";

const { Title, Paragraph } = Typography;

export function DemoHome() {
  const { token } = useAppDesignToken();
  const layout = useLayoutAdaptation();

  const styles = useMemo(
    () => createDemoHomeStyles(token, layout),
    [token, layout],
  );

  const gridCols = layout.isMobile ? 1 : layout.screens.lg ? 3 : 2;

  return (
    <section style={styles.stack} aria-labelledby="demo-home-title">
      <header style={styles.intro}>
        <Title
          level={1}
          id="demo-home-title"
          style={{ marginTop: 0, marginBottom: 0, ...styles.introTitle }}
        >
          적응형 레이아웃 데모
        </Title>
        <Paragraph style={{ marginBottom: 0, ...styles.introLead }}>
          토큰은 ConfigProvider · 커스텀 UI는 useToken + *.style.ts · Antd 위젯 미세조정은
          theme.components입니다. reduced-motion은 레이아웃 훅과 별도로 반영했습니다.
        </Paragraph>
        <Button type="primary">Antd Button (theme.components + token)</Button>
      </header>
      <ul style={styles.cardList}>
        {["A", "B", "C"].map((id) => (
          <li key={id} style={styles.cardListItem}>
            <article style={styles.card} aria-labelledby={`demo-card-${id}-title`}>
              <Title
                level={2}
                id={`demo-card-${id}-title`}
                style={{
                  marginTop: 0,
                  marginBottom: token.marginXS,
                  ...styles.cardHeading,
                }}
              >
                블록 {id}
              </Title>
              <Paragraph style={{ marginBottom: 0, ...styles.cardLead }}>
                그리드 열: {gridCols}
              </Paragraph>
            </article>
          </li>
            ))}
      </ul>
    </section>
  );
}
