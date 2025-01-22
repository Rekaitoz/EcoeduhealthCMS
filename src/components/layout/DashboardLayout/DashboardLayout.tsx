import { Center, Loader } from '@mantine/core';
import {
  IconBoxSeam,
  IconBuildingEstate,
  IconBuildingStore,
  IconBuildingWarehouse,
  IconLayout,
  IconUsers,
  IconUsersGroup,
} from '@tabler/icons-react';
import { Suspense, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { Sidebar } from '@/components/navigation';
import { useAuth } from '@/features/auth';
import { SidebarNavigation } from '@/types/navigation';

import { Header } from './Header';

const navigations: SidebarNavigation = [
  {
    routes: [
      { title: 'Dashboard', href: '/', icon: IconLayout },
      { title: 'Perusahaan', href: '/company', icon: IconBuildingEstate },
      { title: 'Outlet', href: '/outlet', icon: IconBuildingStore },
      { title: 'Gudang', href: '/warehouse', icon: IconBuildingWarehouse },
      { title: 'Pegawai', href: '/employee', icon: IconUsersGroup },
      { title: 'User', href: '/user', icon: IconUsers },
    ],
  },
  {
    title: 'Data Master',
    routes: [
      {
        title: 'Produk',
        icon: IconBoxSeam,
        routes: [
          { title: 'Data Produk', href: '/product' },
          { title: 'Data Kategori', href: '/category' },
        ],
      },
    ],
  },
];

const LoadingScreen = () => (
  <Center className="w-full h-full bg-body">
    <Loader />
  </Center>
);

export const DashboardLayout: React.FC = () => {
  const { creds, logout } = useAuth();

  useEffect(() => {
    if (!creds) return;

    if (creds.role == 'employee') logout();
  }, [creds, logout]);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar navigations={navigations} />

      <div
        className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden pb-12"
        id="content"
      >
        <Header />
        <Suspense fallback={<LoadingScreen />}>
          <div className="px-4 sm:px-6 lg:px-8 py-8 pb-14 w-full max-w-8xl mx-auto">
            <Outlet />
          </div>
        </Suspense>
      </div>
    </div>
  );
};
