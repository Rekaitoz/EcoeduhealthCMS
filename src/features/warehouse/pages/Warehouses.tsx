import { Button } from '@mantine/core';
import { IconArrowLeft, IconBulldozer } from '@tabler/icons-react';

export const Warehouses: React.FC = () => {
  // function handleAdd() {
  //   modals.open({
  //     title: 'Tambah Gudang',
  //     children: <WarehouseCreateForm />,
  //   });
  // }

  return (
    <main>
      <div className="flex flex-col items-center justify-center py-24">
        <IconBulldozer size={72} className="text-gray-600" />
        <h1 className="text-lg font-bold mb-4">Fitur Dalam Pengembangan</h1>
        <Button leftleftSection={<IconArrowLeft size={16} />}>Kembali</Button>
      </div>
      {/* <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Gudang</h1>
        <Button onClick={handleAdd}>Tambah</Button>
      </div>

      <section className="mb-8">
        <WarehouseTable />
      </section> */}
    </main>
  );
};
