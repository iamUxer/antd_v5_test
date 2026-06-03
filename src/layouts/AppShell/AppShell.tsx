import { Button, Menu, Space } from 'antd';
import { DashboardOutlined, FundOutlined, LineChartOutlined, CreditCardOutlined } from '@ant-design/icons';
import { useMemo, type ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLayoutAdaptation } from '@/hooks/useLayoutAdaptation';
import { useAppTheme } from '@/providers/AppThemeProvider';
import { useAppDesignToken } from '@/theme/appDesignToken';
import { createAppShellStyles } from './AppShell.style';


type Props = { children: ReactNode };

const NAV_ITEMS = [
  { key: '/',          icon: <DashboardOutlined />,  label: '대시보드' },
  { key: '/budget',    icon: <FundOutlined />,        label: '월 예산' },
  { key: '/cashflow',  icon: <LineChartOutlined />,   label: '현금흐름' },
  { key: '/spending',  icon: <CreditCardOutlined />,  label: '지출 분석' },
];

export function AppShell({ children }: Props) {
  const { token } = useAppDesignToken();
  const layout = useLayoutAdaptation();
  const { mode, setMode } = useAppTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const styles = useMemo(
    () => createAppShellStyles({ token, layout }),
    [token, layout],
  );

  return (
    <div style={styles.shell}>
      <header style={styles.header}>
        <a href="/" style={styles.brand} aria-label="홈으로 이동">
          💰 재정 관리
        </a>
        <div style={styles.headerActions}>
          <Space size="small" wrap>
            <Button size="small" onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}>
              {mode === 'dark' ? '☀️ 라이트' : '🌙 다크'}
            </Button>
          </Space>
        </div>
      </header>
      <div style={styles.body}>
        {layout.isDesktop && (
          <aside style={styles.sider} aria-label="사이드 내비게이션">
            <nav style={styles.siderInner}>
              <Menu
                mode="inline"
                selectedKeys={[location.pathname]}
                style={{ border: 'none', background: 'transparent' }}
                items={NAV_ITEMS.map(item => ({
                  key: item.key,
                  icon: item.icon,
                  label: item.label,
                  onClick: () => navigate(item.key),
                }))}
              />
            </nav>
          </aside>
        )}
        {!layout.isDesktop && (
          <div style={{ display: 'flex', width: '100%', borderBottom: `1px solid ${token.colorBorderSecondary}`, background: token.colorBgContainer, overflowX: 'auto' }}>
            {NAV_ITEMS.map(item => (
              <button
                key={item.key}
                onClick={() => navigate(item.key)}
                style={{
                  flex: 1, padding: '10px 4px', border: 'none', background: 'transparent',
                  cursor: 'pointer', fontSize: 11, color: location.pathname === item.key ? '#6366f1' : token.colorTextSecondary,
                  borderBottom: location.pathname === item.key ? '2px solid #6366f1' : '2px solid transparent',
                  whiteSpace: 'nowrap',
                }}
              >
                <div style={{ fontSize: 16, marginBottom: 2 }}>{item.icon}</div>
                {item.label}
              </button>
            ))}
          </div>
        )}
        <main id="app-main" style={styles.main} tabIndex={-1}>
          {children}
        </main>
      </div>
    </div>
  );
}
