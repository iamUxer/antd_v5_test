import { Card, Col, Row, Table, Tag, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { bankFixed, cardItems, specialBudget, BANK_TOTAL, CARD_TOTAL, MONTHLY_TOTAL, type BudgetItem, type SpecialBudgetItem } from '@/data/budget';

const { Title, Text } = Typography;
const fmt = (n: number) => n.toLocaleString('ko-KR') + '원';

const amountCol = {
  title: '금액',
  dataIndex: 'amount',
  key: 'amount',
  align: 'right' as const,
  render: (v: number) => <Text strong>{fmt(v)}</Text>,
};

const nameCol = {
  title: '항목',
  dataIndex: 'name',
  key: 'name',
  render: (name: string, record: BudgetItem) => (
    <span>{record.emoji} {name}</span>
  ),
};

const bankColumns: ColumnsType<BudgetItem> = [nameCol, amountCol];
const cardColumns: ColumnsType<BudgetItem> = [nameCol, amountCol];

const specialColumns: ColumnsType<SpecialBudgetItem> = [
  nameCol,
  { title: '금액', dataIndex: 'amount', key: 'amount', align: 'right', render: (v: number) => <Text strong>{fmt(v)}</Text> },
  { title: '납부 시기', dataIndex: 'month', key: 'month', render: (v: string) => <Tag color="orange">{v}</Tag> },
  { title: '결제 수단', dataIndex: 'paymentMethod', key: 'method', render: (v: string) => <Tag color={v === 'card' ? 'blue' : 'green'}>{v === 'card' ? '카드' : '은행'}</Tag> },
];

const bankFooter = () => (
  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
    <Text strong>소계</Text>
    <Text strong style={{ color: '#6366f1' }}>{fmt(BANK_TOTAL)}</Text>
  </div>
);

const cardFooter = () => (
  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
    <Text strong>소계</Text>
    <Text strong style={{ color: '#22c55e' }}>{fmt(CARD_TOTAL)}</Text>
  </div>
);

export function Budget() {
  return (
    <div style={{ paddingBottom: 40 }}>
      <Title level={4} style={{ marginBottom: 20 }}>🔒 월 예산안</Title>

      <Row gutter={[14, 14]}>
        <Col xs={24} md={12}>
          <Card
            title={<><span style={{ color: '#6366f1' }}>🏦</span> 은행 고정비 — {fmt(BANK_TOTAL)}</>}
            size="small"
          >
            <Table<BudgetItem>
              dataSource={bankFixed}
              columns={bankColumns}
              rowKey="key"
              pagination={false}
              size="small"
              footer={bankFooter}
            />
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card
            title={<><span style={{ color: '#22c55e' }}>💳</span> 카드 항목 — {fmt(CARD_TOTAL)}</>}
            size="small"
          >
            <Table<BudgetItem>
              dataSource={cardItems}
              columns={cardColumns}
              rowKey="key"
              pagination={false}
              size="small"
              footer={cardFooter}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[14, 14]} style={{ marginTop: 14 }}>
        <Col xs={24} md={12}>
          <Card title="📅 특별예산 (연 1회)" size="small">
            <Table<SpecialBudgetItem>
              dataSource={specialBudget}
              columns={specialColumns}
              rowKey="key"
              pagination={false}
              size="small"
              footer={() => (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Text strong>연간 합계</Text>
                  <Text strong style={{ color: '#f59e0b' }}>{fmt(specialBudget.reduce((s, i) => s + i.amount, 0))}</Text>
                </div>
              )}
            />
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card title="📊 월 예산 요약" size="small">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '8px 0' }}>
              {[
                { label: '🏦 은행 고정비', amount: BANK_TOTAL, color: '#6366f1' },
                { label: '💳 카드 항목',   amount: CARD_TOTAL,  color: '#22c55e' },
              ].map(({ label, amount, color }) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: '#fafafa', borderRadius: 8 }}>
                  <Text>{label}</Text>
                  <Text strong style={{ color, fontSize: 15 }}>{fmt(amount)}</Text>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 12px', background: '#f0f0ff', borderRadius: 8 }}>
                <Text strong>📌 월 총 예산</Text>
                <Text strong style={{ fontSize: 18, color: '#4338ca' }}>{fmt(MONTHLY_TOTAL)}</Text>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: '#f0fff4', borderRadius: 8 }}>
                <Text>💰 월 순저축 (급여 622만 기준)</Text>
                <Text strong style={{ color: '#22c55e', fontSize: 15 }}>+{fmt(6_220_000 - MONTHLY_TOTAL)}</Text>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
