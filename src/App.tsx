import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppShell } from '@/layouts/AppShell/AppShell';
import { Dashboard } from '@/pages/Dashboard/Dashboard';
import { Budget } from '@/pages/Budget/Budget';
import { CashFlow } from '@/pages/CashFlow/CashFlow';
import { Spending } from '@/pages/Spending/Spending';

export default function App() {
  return (
    <BrowserRouter>
      <AppShell>
        <Routes>
          <Route path="/"          element={<Dashboard />} />
          <Route path="/budget"    element={<Budget />} />
          <Route path="/cashflow"  element={<CashFlow />} />
          <Route path="/spending"  element={<Spending />} />
          <Route path="*"          element={<Navigate to="/" replace />} />
        </Routes>
      </AppShell>
    </BrowserRouter>
  );
}
