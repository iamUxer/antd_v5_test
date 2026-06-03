import { Card, Col, Row, Table, Tag, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Bar, BarChart, CartesianGrid, Cell, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { INITIAL_BALANCE, type CashFlowRow } from '@/data/cashflow';
import { MONTHLY_TOTAL, MONTHLY_SAVINGS } from '@/data/budget';
import { useAdjustedCashflow } from '@/hooks/useAdjustedCashflow';
import { useLayoutAdaptation } from '@/hooks/useLayoutAdaptation';

const { Title, Text } = Typography;
const columns: ColumnsType<CashFlowRow> = [
  {
    title: '월',
    dataIndex: 'label',
    key: 'month',
    render: (_, r) => (
      <span>
        {r.year === 2027 && <Tag color="purple" style={{ fontSize: 10, padding: '0 4px' }}>2027</Tag>}
        {r.month}
        {r.isFlip && <Tag color="green" style={{ fontSize: 10, marginLeft: 4 }}>흑자전환</Tag>}
      </span>
    ),
  },
  {
    title: '수입',
    dataIndex: 'income',
    align: 'right',
    responsive: ['sm'],
    render: v => <Text style={{ color: '#22c55e', fontSize: 12 }}>+{v.toLocaleString()}</Text>,
  },
  {
    title: '지출',
    dataIndex: 'expense',
    align: 'right',
    responsive: ['sm'],
    render: v => <Text style={{ fontSize: 12 }}>{v.toLocaleString()}</Text>,
  },
  {
    title: '잔액',
    dataIndex: 'balance',
    align: 'right',
    render: (v, _rec) => (
      <Text strong style={{ color: v < 0 ? '#ef4444' : '#6366f1', fontSize: 13 }}>
        {v < 0 ? '-' : '+'}{Math.abs(v).toLocaleString()}원
      </Text>
    ),
  },
  {
    title: '비고',
    dataIndex: 'note',
    responsive: ['md'],
    render: (v, _r) => v ? <Text type="secondary" style={{ fontSize: 11 }}>{v}</Text> : null,
  },
];

export function CashFlow() {
  const { isMobile } = useLayoutAdaptation();
  const { cashflow } = useAdjustedCashflow();

  const chartData = cashflow.map(r => ({
    name: r.label.replace('2026-', '').replace('2027-', '') + (r.year === 2027 ? "'" : ''),
    잔액: r.balance,
    label: r.label,
  }));

  return (
    <div style={{ paddingBottom: 40 }}>
      <Title level={4} style={{ marginBottom: 20 }}>📈 통장 잔액 예측 (2026~2027)</Title>

      <Row gutter={[14, 14]} style={{ marginBottom: 14 }}>
        {[
          { label: '현재 잔액', value: INITIAL_BALANCE, color: '#ef4444', sub: '마이너스 통장' },
          { label: '월 총 예산', value: -MONTHLY_TOTAL, color: '#f59e0b', sub: '지출 합계' },
          { label: '월 순저축', value: MONTHLY_SAVINGS, color: '#22c55e', sub: '예산 준수 시' },
          { label: '2026년 말', value: cashflow.filter(r => r.year === 2026).at(-1)!.balance, color: '#6366f1', sub: '예측 잔액' },
        ].map(({ label, value, color, sub }) => (
          <Col xs={12} sm={6} key={label}>
            <Card size="small" styles={{ body: { padding: 14, textAlign: 'center' } }}>
              <Text type="secondary" style={{ fontSize: 11, display: 'block', marginBottom: 4 }}>{label}</Text>
              <Text strong style={{ color, fontSize: 16, display: 'block' }}>
                {value < 0 ? '-' : '+'}{Math.abs(value).toLocaleString()}원
              </Text>
              <Text type="secondary" style={{ fontSize: 10 }}>{sub}</Text>
            </Card>
          </Col>
        ))}
      </Row>

      <Card title="월별 잔액 추이" size="small" style={{ marginBottom: 14 }}>
        <ResponsiveContainer width="100%" height={isMobile ? 220 : 280}>
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" tick={{ fontSize: 10 }} />
            <YAxis
              tickFormatter={v => v >= 0 ? `${(v / 1e7).toFixed(0)}천만` : `-${(Math.abs(v) / 1e6).toFixed(0)}백만`}
              tick={{ fontSize: 10 }}
            />
            <Tooltip
              formatter={(v) => v != null ? [`${+v < 0 ? '-' : '+'}${Math.abs(+v).toLocaleString()}원`, '잔액'] : []}
              labelFormatter={l => `${l}월`}
            />
            <ReferenceLine y={0} stroke="#999" strokeWidth={2} />
            <Bar dataKey="잔액" radius={[4, 4, 0, 0]}>
              {chartData.map((entry) => (
                <Cell key={entry.label} fill={entry.잔액 < 0 ? '#ef4444' : '#6366f1'} fillOpacity={0.8} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <Card title="월별 상세 내역" size="small">
        <Table<CashFlowRow>
          dataSource={cashflow}
          columns={columns}
          rowKey="label"
          pagination={false}
          size="small"
          scroll={{ x: 620 }}
          rowClassName={r => r.isFlip ? 'flip-row' : r.isSpecial ? 'special-row' : ''}
        />
      </Card>
    </div>
  );
}
