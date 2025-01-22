import { Button } from '@mantine/core';
import { IconArrowLeft, IconBulldozer } from '@tabler/icons-react';

// import { WarehouseTable } from '../components';
// import { useOutletDetail } from '../hooks';

export const OutletWarehouses: React.FC = () => {
  // const { outlet } = useOutletDetail();

  return (
    <>
      <div className="flex flex-col items-center justify-center py-24">
        <IconBulldozer size={72} className="text-gray-600" />
        <h1 className="text-lg font-bold mb-4">Fitur Dalam Pengembangan</h1>
        <Button leftSection={<IconArrowLeft size={16} />}>Kembali</Button>
      </div>
      {/* <div className="space-y-6">
      <WarehouseTable outlet={outlet.id} />
    </div> */}
    </>
  );
};
