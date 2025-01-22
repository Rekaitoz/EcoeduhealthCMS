import { Loader, Tabs } from '@mantine/core';
import {
  IconBuildingWarehouse,
  IconFileInvoice,
  IconListDetails,
  IconUsers,
} from '@tabler/icons-react';
import { Suspense } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';

import { NotFoundState } from '@/components/elements';

import { useOutlet } from '..';

export const OutletProvider: React.FC = () => {
  const { id } = useParams<'id'>();
  const { data, isLoading, isError } = useOutlet({ id: parseInt(id ?? '') });
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const path = pathname.split('/');

  function handleTabChange(value: string | null) {
    navigate(`/outlet/${id}/${value != 'detail' ? value : ''}`);
  }

  if (isLoading)
    return (
      <div>
        <div className="bg-gray-300 rounded-md w-64 h-8 mb-6 animate-pulse"></div>
        <div className="space-y-3">
          <div className="bg-gray-300 rounded-md w-full h-6 animate-pulse"></div>
          <div className="bg-gray-300 rounded-md w-3/4 h-6 animate-pulse"></div>
        </div>
      </div>
    );

  if (isError) return <NotFoundState />;

  return (
    <main>
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-700 capitalize">{data?.name}</h1>
      </header>

      <Tabs
        value={path.length > 3 ? (path[3] != '' ? path[3] : 'detail') : 'detail'}
        variant="pills"
        onChange={handleTabChange}
        className="mb-4"
      >
        <Tabs.List>
          <Tabs.Tab value="detail" leftSection={<IconListDetails size={14} />}>
            Detail
          </Tabs.Tab>
          <Tabs.Tab value="transaction" leftSection={<IconFileInvoice size={14} />}>
            Transaksi
          </Tabs.Tab>
          <Tabs.Tab value="employee" leftSection={<IconUsers size={14} />}>
            Pegawai
          </Tabs.Tab>
          <Tabs.Tab value="warehouse" leftSection={<IconBuildingWarehouse size={14} />}>
            Gudang
          </Tabs.Tab>
        </Tabs.List>
      </Tabs>

      <Suspense fallback={<Loader className="mt-24 mx-auto" />}>
        <Outlet context={{ outlet: data }} />
      </Suspense>
    </main>
  );
};
