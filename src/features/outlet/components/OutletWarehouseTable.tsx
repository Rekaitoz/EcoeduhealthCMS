import { Button, Card, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';

import { Table } from '@/components/elements';
import { dayjs } from '@/lib/dayjs';

import { useOutletWarehouses, useRemoveWarehouse } from '../api';

import { WarehouseAddForm } from './WarehouseAddForm';

type Props = {
  outlet: number;
};

export const WarehouseTable: React.FC<Props> = ({ outlet }) => {
  const { data } = useOutletWarehouses({ id: outlet });
  const deleteMutation = useRemoveWarehouse();

  function handleRemove(id: number) {
    return () => {
      modals.openConfirmModal({
        title: 'Hapus Warehouse',
        children: (
          <Text size="sm">Apakah anda yakin untuk menghapus hak akses gudang pada outlet ini?</Text>
        ),
        centered: true,
        closeOnConfirm: false,
        onConfirm: async () => {
          await deleteMutation.mutateAsync(
            { outletId: outlet, warehouseId: id },
            {
              onSuccess: () => {
                notifications.show({
                  message: 'Warehouse berhasil dihapus',
                  color: 'green',
                  icon: <IconCheck />,
                });
                modals.closeAll();
              },
            }
          );
        },
      });
    };
  }

  function handleAdd() {
    modals.open({
      title: 'Tambah Gudang',
      children: <WarehouseAddForm outlet={outlet} />,
    });
  }

  return (
    <Card p="lg" shadow="sm">
      <div className="flex items-center justify-between mb-4">
        <div className="font-bold text-lg">
          <h2 className="text-gray-800 inline">Warehouse</h2>
        </div>

        <div className="flex items-center space-x-2">
          <Button size="xs" onClick={handleAdd}>
            Tambah
          </Button>
        </div>
      </div>

      <Card.Section>
        <Table
          header={['Nama', 'Alamat', 'Created At', '']}
          items={data?.result ?? []}
          renderItem={(warehouse) => (
            <tr key={warehouse.id}>
              <td>{warehouse.name}</td>
              <td>{warehouse.address || '-'}</td>
              <td>{dayjs(warehouse.createdAt).format('D MMMM YYYY')}</td>
              <td>
                <div className="flex items-center space-x-2">
                  <Button size="xs" color="red" onClick={handleRemove(warehouse.id)}>
                    Hapus Akses
                  </Button>
                </div>
              </td>
            </tr>
          )}
        />
      </Card.Section>
    </Card>
  );
};
