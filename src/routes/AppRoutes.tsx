import { Route, Routes } from 'react-router-dom';

import { AppLayout, AuthLayout, DashboardLayout } from '@/components/layout';
import { CompanyProvider } from '@/features/company';
import { OutletProvider } from '@/features/outlet';
import { CompanySummary, OutletSummary, TransactionSummary } from '@/features/transaction';
import { WarehouseProvider } from '@/features/warehouse';
import { lazyImport } from '@/utils/lazyImport';

const { Login } = lazyImport(() => import('@/features/auth'), 'Login');
const { Dashboard } = lazyImport(() => import('@/features/misc'), 'Dashboard');
const { Users } = lazyImport(() => import('@/features/user'), 'Users');
const { Quiz } = lazyImport(() => import('@/features/quiz'), 'Quiz');
const { QuizDetail } = lazyImport(() => import('@/features/quiz'), 'QuizDetail');

const { Employees } = lazyImport(() => import('@/features/employee'), 'Employees');

const { Categories } = lazyImport(() => import('@/features/product'), 'Categories');
const { Products } = lazyImport(() => import('@/features/product'), 'Products');
const { ProductCreate } = lazyImport(() => import('@/features/product'), 'ProductCreate');
const { ProductUpdate } = lazyImport(() => import('@/features/product'), 'ProductUpdate');

const { Outlets } = lazyImport(() => import('@/features/outlet'), 'Outlets');
const { OutletDetail } = lazyImport(() => import('@/features/outlet'), 'OutletDetail');
const { OutletTransactions } = lazyImport(() => import('@/features/outlet'), 'OutletTransactions');
const { OutletEmployees } = lazyImport(() => import('@/features/outlet'), 'OutletEmployees');
const { OutletWarehouses } = lazyImport(() => import('@/features/outlet'), 'OutletWarehouses');

const { Warehouses } = lazyImport(() => import('@/features/warehouse'), 'Warehouses');
const { WarehouseDetail } = lazyImport(() => import('@/features/warehouse'), 'WarehouseDetail');

const { Companies } = lazyImport(() => import('@/features/company'), 'Companies');
const { CompanyDetail } = lazyImport(() => import('@/features/company'), 'CompanyDetail');
const { CompanySettings } = lazyImport(() => import('@/features/company'), 'CompanySettings');
const { CompanyOwners } = lazyImport(() => import('@/features/company'), 'CompanyOwners');
const { CompanyOutlets } = lazyImport(() => import('@/features/company'), 'CompanyOutlets');
const { CompanyProducts } = lazyImport(() => import('@/features/company'), 'CompanyProducts');
const { CompanyAttendances } = lazyImport(() => import('@/features/company'), 'CompanyAttendances');

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="/user" element={<Users />} />
          <Route path="/employee" element={<Employees />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/quiz/detail/:id" element={<QuizDetail />} />

          <Route path="/category" element={<Categories />} />
          <Route path="/product" element={<Products />} />
          <Route path="/product/add" element={<ProductCreate />} />
          <Route path="/product/:id" element={<ProductUpdate />} />

          <Route path="/company" element={<Companies />} />
          <Route path="/company/:id" element={<CompanyProvider />}>
            <Route index element={<CompanyDetail />} />
            <Route path="owner" element={<CompanyOwners />} />
            <Route path="outlet" element={<CompanyOutlets />} />
            <Route path="product" element={<CompanyProducts />} />
            <Route path="attendance" element={<CompanyAttendances />} />
            <Route path="settings" element={<CompanySettings />} />
          </Route>

          <Route path="/outlet" element={<Outlets />} />
          <Route path="/outlet/:id" element={<OutletProvider />}>
            <Route index element={<OutletDetail />} />
            <Route path="transaction" element={<OutletTransactions />} />
            <Route path="employee" element={<OutletEmployees />} />
            <Route path="warehouse" element={<OutletWarehouses />} />
          </Route>

          <Route path="/warehouse" element={<Warehouses />} />
          <Route path="/warehouse/:id" element={<WarehouseProvider />}>
            <Route index element={<WarehouseDetail />} />
          </Route>
        </Route>

        <Route path="/transaction/print" element={<TransactionSummary />} />
        <Route path="/outlet/:id/transaction/print" element={<OutletSummary />} />
        <Route path="/company/:id/transaction/print" element={<CompanySummary />} />
      </Route>

      <Route path="/" element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
};
