import { Card } from '@mantine/core';

import { OutletDeleteForm, OutletUpdateForm } from '..';
import { useOutletDetail } from '../hooks';

export const OutletDetail: React.FC = () => {
  const { outlet } = useOutletDetail();

  return (
    <div className="space-y-6">
      <Card p="lg" shadow="sm">
        <header className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-lg text-gray-900">Informasi Outlet</h2>
        </header>
        <OutletUpdateForm outlet={outlet} />
      </Card>

      <OutletDeleteForm id={outlet.id} />
    </div>
  );
};
