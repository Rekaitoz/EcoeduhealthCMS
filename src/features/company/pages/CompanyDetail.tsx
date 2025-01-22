import { IconBuildingStore } from '@tabler/icons-react';

import { useOutletCount } from '@/features/outlet';

import { useCompanyDetail } from '../hooks';

export const CompanyDetail: React.FC = () => {
  const { company } = useCompanyDetail();
  const { data, isLoading, isError } = useOutletCount({ params: { company: company.id } });

  if (isLoading || isError) return null;

  return (
    <div className="mt-4">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-5 shadow-lg shadow-gray-200">
          <div className="p-1.5 rounded-lg bg-blue-100 text-blue-600 inline-block">
            <IconBuildingStore size={18} />
          </div>
          <h2 className="font-semibold text-sm text-gray-600">Jumlah Seluruh Outlet</h2>
          <div className="mt-1">
            <span className="font-bold text-4xl">{data.totalCount}</span>
            <span className="text-sm font-semibold ml-2 text-gray-600">Outlet</span>
          </div>
        </div>
        <div className="bg-white rounded-lg p-5 shadow-lg shadow-gray-200">
          <div className="p-1.5 rounded-lg bg-green-100 text-green-600 inline-block">
            <IconBuildingStore size={18} />
          </div>
          <h2 className="font-semibold text-sm text-gray-600">Jumlah Outlet Aktif</h2>
          <div className="mt-1">
            <span className="font-bold text-4xl">{data.activeCount}</span>
            <span className="text-sm font-semibold ml-2 text-gray-600">Outlet</span>
          </div>
        </div>
        <div className="bg-white rounded-lg p-5 shadow-lg shadow-gray-200">
          <div className="p-1.5 rounded-lg bg-red-100 text-red-600 inline-block">
            <IconBuildingStore size={18} />
          </div>
          <h2 className="font-semibold text-sm text-gray-600">Jumlah Outlet Nonaktif</h2>
          <div className="mt-1">
            <span className="font-bold text-4xl">{data.inactiveCount}</span>
            <span className="text-sm font-semibold ml-2 text-gray-600">Outlet</span>
          </div>
        </div>
      </div>
    </div>
  );
};
