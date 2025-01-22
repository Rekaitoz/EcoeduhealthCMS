import { Card } from '@mantine/core';

import { WarehouseDeleteForm, WarehouseUpdateForm } from '../components';
import { useWarehouseDetail } from '../hooks';

export const WarehouseDetail: React.FC = () => {
  const { warehouse } = useWarehouseDetail();

  return (
    <div className="space-y-6">
      <Card p="lg" shadow="sm">
        <header className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-lg text-gray-900">Informasi Gudang</h2>
        </header>
        <WarehouseUpdateForm warehouse={warehouse} />
      </Card>

      <WarehouseDeleteForm id={warehouse.id} />
    </div>
  );
};
