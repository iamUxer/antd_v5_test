import { Card, Col, Progress, Row, Statistic, Tag, Typography } from 'antd';
import { ArrowUpOutlined, BankOutlined } from '@ant-design/icons';
import { BANK_TOTAL, CARD_TOTAL, MONTHLY_SAVINGS, MONTHLY_TOTAL } from '@/data/budget';
import { cashFlowData, INITIAL_BALANCE } from '@/data/cashflow';
import { cardSummary, CARD_ANNUAL_TOTAL } from '@/data/spending';

const { Title, Text } = Typography;

const fmt = (n: number) => n.toLocaleString('ko-KR') + '원';

export function Dashboard() {
  const currentMonth = cashFlowData.find(r => r.label === '2026-06')!;
  const flipMonth = cashFlowData.find(r => r.isFlip)!;
  const end2026 = cashFlowData.filter(r => r.year === 2026).at(-1)!;
  const end2027 = cashFlowData.at(-1)!;


  return (
    <div style={{ padding: '0 0 40px' }}>
      <Title level={4} style={{ marginBottom: 20 }}>📊 재정 현황 대시보드</Title>

      {/* 주요 KPI */}
      <Row gutter={[14, 14]} style={{ marginBottom: 20 }}>
        <Col xs={12} sm={8} md={6}>
          <Card size="small" styles={{ body: { padding: 16 } }}>
            <Statistic
              title="현재 통장 잔액"
              value={Math.abs(INITIAL_BALANCE)}
              prefix={INITIAL_BALANCE < 0 ? '-' : '+'}
              suffix="원"
              valueStyle={{ color: '#ef4444', fontSize: 18 }}
              formatter={v => v.toLocaleString()}
            />
            <Text type="secondary" style={{ fontSize: 11 }}>마이너스 통장</Text>
          </Card>
        </Col>
        <Col xs={12} sm={8} md={6}>
          <Card size="small" styles={{ body: { padding: 16 } }}>
            <Statistic
              title="월 총 예산"
              value={MONTHLY_TOTAL}
              suffix="원"
              valueStyle={{ fontSize: 18 }}
              formatter={v => v.toLocaleString()}
            />
            <Text type="secondary" style={{ fontSize: 11 }}>은행 {fmt(BANK_TOTAL)} + 카드 {fmt(CARD_TOTAL)}</Text>
          </Card>
        </Col>
        <Col xs={12} sm={8} md={6}>
          <Card size="small" styles={{ body: { padding: 16 } }}>
            <Statistic
              title="월 순저축"
              value={MONTHLY_SAVINGS}
              prefix={<ArrowUpOutlined />}
              suffix="원"
              valueStyle={{ color: '#22c55e', fontSize: 18 }}
              formatter={v => v.toLocaleString()}
            />
            <Text type="secondary" style={{ fontSize: 11 }}>예산 준수 시</Text>
          </Card>
        </Col>
        <Col xs={12} sm={8} md={6}>
          <Card size="small" styles={{ body: { padding: 16 } }}>
            <Statistic
              title="흑자 전환"
              value={flipMonth.label}
              valueStyle={{ color: '#f59e0b', fontSize: 18 }}
            />
            <Text type="secondary" style={{ fontSize: 11 }}>마이너스 통장 해소 시점</Text>
          </Card>
        </Col>
      </Row>

      {/* 잔액 예측 */}
      <Row gutter={[14, 14]} style={{ marginBottom: 20 }}>
        <Col xs={24} sm={12}>
          <Card title="📅 잔액 예측" size="small">
            <Row gutter={[0, 12]}>
              {[
                { label: '6월 말 (현재 달)', val: currentMonth.balance, color: '#ef4444' },
                { label: '9월 (흑자 전환)', val: flipMonth.balance, color: '#22c55e' },
                { label: '2026년 말', val: end2026.balance, color: '#6366f1' },
                { label: '2027년 말', val: end2027.balance, color: '#818cf8' },
              ].map(({ label, val, color }) => (
                <Col span={24} key={label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ fontSize: 12 }}>{label}</Text>
                    <Text strong style={{ color, fontSize: 14 }}>
                      {val < 0 ? '-' : '+'}{Math.abs(val).toLocaleString()}원
                    </Text>
                  </div>
                </Col>
              ))}
            </Row>
          </Card>
        </Col>

        <Col xs={24} sm={12}>
          <Card title="💳 카드별 연간 지출 (2025 실적)" size="small">
            {cardSummary.map(c => (
              <div key={c.name} style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <Text style={{ fontSize: 12 }}>{c.name} ({c.count}건)</Text>
                  <Text strong style={{ fontSize: 12 }}>{c.annual.toLocaleString()}원</Text>
                </div>
                <Progress
                  percent={Math.round(c.annual / CARD_ANNUAL_TOTAL * 100)}
                  strokeColor={c.color}
                  size="small"
                  format={p => `${p}%`}
                />
              </div>
            ))}
            <div style={{ textAlign: 'right', marginTop: 8 }}>
              <Text type="secondary" style={{ fontSize: 11 }}>연간 합계 {CARD_ANNUAL_TOTAL.toLocaleString()}원</Text>
            </div>
          </Card>
        </Col>
      </Row>

      {/* 예산 구성 */}
      <Row gutter={[14, 14]}>
        <Col xs={24} sm={12}>
          <Card title={<><BankOutlined /> 이번달 예산 구성</>} size="small">
            <div style={{ marginBottom: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <Text style={{ fontSize: 12 }}>🏦 은행 고정비</Text>
                <Text strong>{fmt(BANK_TOTAL)}</Text>
              </div>
              <Progress percent={Math.round(BANK_TOTAL / MONTHLY_TOTAL * 100)} strokeColor="#6366f1" size="small" />
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <Text style={{ fontSize: 12 }}>💳 카드 항목</Text>
                <Text strong>{fmt(CARD_TOTAL)}</Text>
              </div>
              <Progress percent={Math.round(CARD_TOTAL / MONTHLY_TOTAL * 100)} strokeColor="#22c55e" size="small" />
            </div>
            <div style={{ textAlign: 'right', marginTop: 10, paddingTop: 10, borderTop: '1px solid #f0f0f0' }}>
              <Text type="secondary" style={{ fontSize: 11 }}>총 예산 </Text>
              <Text strong style={{ fontSize: 16 }}>{fmt(MONTHLY_TOTAL)}</Text>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12}>
          <Card title="📅 6월 이벤트" size="small">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontSize: 12 }}>6월 10일 급여 (3.3% 제외)</Text>
                <Tag color="green">+6,092,100원</Tag>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontSize: 12 }}>종소세 환급</Text>
                <Tag color="green">+1,230,000원</Tag>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontSize: 12 }}>6월 25일 카드 결제</Text>
                <Tag color="red">-1,580,000원</Tag>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontSize: 12 }}>6월 15일 헬스장 등록 (카드)</Text>
                <Tag color="orange">-1,000,000원 (7월 청구)</Tag>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
