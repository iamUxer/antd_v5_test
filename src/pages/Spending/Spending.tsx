import { Card, Col, Row, Table, Tag, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { spendingCategories, cardSummary, monthlyCardData, CARD_ANNUAL_TOTAL, CARD_MONTHLY_AVG } from '@/data/spending';
import type { SpendingCategory } from '@/data/spending';

const { Title, Text } = Typography;

const COLORS = ['#6366f1', '#22c55e', '#f59e0b', '#ef4444', '#3b82f6', '#ec4899', '#14b8a6', '#f97316'];

const columns: ColumnsType<SpendingCategory> = [
  {
    title: '카테고리',
    dataIndex: 'name',
    render: (name, r) => <span>{r.emoji} {name}</span>,
  },
  {
    title: '월평균',
    dataIndex: 'monthly',
    align: 'right',
    render: v => <Text strong style={{ color: '#6366f1' }}>{v.toLocaleString()}원</Text>,
  },
  {
    title: '연간',
    dataIndex: 'annual',
    align: 'right',
    render: v => <Text style={{ fontSize: 12 }}>{v.toLocaleString()}원</Text>,
  },
  {
    title: '건수',
    dataIndex: 'count',
    align: 'center',
    render: v => <Tag>{v}건</Tag>,
  },
  {
    title: '비중',
    dataIndex: 'annual',
    align: 'right',
    render: v => <Text type="secondary" style={{ fontSize: 11 }}>{(v / CARD_ANNUAL_TOTAL * 100).toFixed(1)}%</Text>,
  },
];

const pieData = spendingCategories.slice(0, 8).map(c => ({
  name: c.name,
  value: c.annual,
}));

export function Spending() {
  return (
    <div style={{ paddingBottom: 40 }}>
      <Title level={4} style={{ marginBottom: 4 }}>💳 2025년 카드 지출 분석</Title>
      <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 20 }}>
        신한카드(491건) + 국민카드(370건) + 현대카드(44건) · 연간 합계 {CARD_ANNUAL_TOTAL.toLocaleString()}원 · 월평균 {CARD_MONTHLY_AVG.toLocaleString()}원
      </Text>

      <Row gutter={[14, 14]} style={{ marginBottom: 14 }}>
        {cardSummary.map(c => (
          <Col xs={24} sm={8} key={c.name}>
            <Card size="small" styles={{ body: { padding: 14 } }}>
              <Text type="secondary" style={{ fontSize: 11 }}>{c.name} · {c.count}건</Text>
              <div style={{ fontSize: 18, fontWeight: 700, color: c.color, marginTop: 4 }}>{c.annual.toLocaleString()}원</div>
              <Text type="secondary" style={{ fontSize: 11 }}>연간 / 월평균 {Math.round(c.annual / 12).toLocaleString()}원</Text>
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[14, 14]} style={{ marginBottom: 14 }}>
        <Col xs={24} md={12}>
          <Card title="카테고리 비중" size="small">
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value" label={({ percent }) => percent != null ? `${(percent * 100).toFixed(0)}%` : ''} labelLine={false}>
                  {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip formatter={(v) => v != null ? [(+v).toLocaleString() + '원'] : []} />
                <Legend iconSize={10} wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="카드별 월별 지출" size="small">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={monthlyCardData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                <YAxis tickFormatter={v => `${(v / 10000).toFixed(0)}만`} tick={{ fontSize: 9 }} />
                <Tooltip formatter={(v) => v != null ? [(+v).toLocaleString() + '원'] : []} />
                <Legend iconSize={10} wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="신한" stackId="a" fill="#6366f1" radius={[0, 0, 0, 0]} />
                <Bar dataKey="국민" stackId="a" fill="#22c55e" />
                <Bar dataKey="현대" stackId="a" fill="#f59e0b" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      <Card title="카테고리별 상세 (월평균 기준)" size="small">
        <Table<SpendingCategory>
          dataSource={spendingCategories}
          columns={columns}
          rowKey="key"
          pagination={false}
          size="small"
        />
      </Card>
    </div>
  );
}
