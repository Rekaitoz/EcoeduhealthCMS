import { ActionIcon, Button, Card, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconEdit, IconTrash } from '@tabler/icons-react';
import { useState } from 'react';

import { Table } from '@/components/elements';
import { dayjs } from '@/lib/dayjs';

import { useDeleteSupplier, useSuppliers } from '../api';
import { Supplier, SupplierQuery } from '../types';

import { SupplierUpdateForm } from './SupplierUpdateForm';

const initialParams: SupplierQuery = {
  limit: 5,
  page: 1,
};

type Props = {
  title?: string;
  company?: number;
  onAdd?: () => void;
};

export const SupplierTable: React.FC<Props> = ({ title = 'Suppliers', company, onAdd }) => {
  const [params, setParams] = useState({ ...initialParams, company });
  const { data } = useSuppliers({ params });
  const deleteMutation = useDeleteSupplier();

  function handlePage(page: number) {
    setParams({ ...params, page });
  }

  function handleRemove(id: number) {
    return () => {
      modals.openConfirmModal({
        title: 'Hapus Supplier',
        children: <Text size="sm">Apakah anda yakin untuk menghapus supplier ini?</Text>,
        centered: true,
        closeOnConfirm: false,
        onConfirm: async () => {
          await deleteMutation.mutateAsync(
            { id },
            {
              onSuccess: () => {
                notifications.show({
                  message: 'Supplier berhasil dihapus',
                  color: 'green',
                  icon: <IconCheck />,
                });
                modals.closeAll();
              },
              onError: () => {
                notifications.show({
                  message: 'Supplier tidak bisa dihapus',
                  color: 'red',
                });
              },
            }
          );
        },
      });
    };
  }

  function handleUpdate(supplier: Supplier) {
    return () => {
      modals.open({
        title: 'Update Supplier',
        children: <SupplierUpdateForm supplier={supplier} company={company} />,
      });
    };
  }

  return (
    <Card p="lg" shadow="sm">
      <div className="flex items-center justify-between mb-4">
        <div className="font-bold text-lg">
          <h2 className="text-gray-800 inline">{title} </h2>
        </div>

        {onAdd && (
          <Button size="xs" onClick={onAdd}>
            Tambah
          </Button>
        )}
      </div>

      <Card.Section>
        <Table
          header={['Nama', 'Deskripsi', 'Last Modified', '']}
          items={data?.result}
          onPageChange={handlePage}
          metadata={data?.metadata}
          renderItem={(supplier) => (
            <tr key={supplier.id}>
              <td>{supplier.name}</td>
              <td>{supplier.description || '-'}</td>
              <td>{dayjs(supplier.updatedAt).format('D MMMM YYYY')}</td>
              <td>
                <div className="flex items-center space-x-2">
                  <ActionIcon
                    title="Remove supplier"
                    onClick={handleRemove(supplier.id)}
                    className="hover:bg-gray-100 active:bg-gray-200 text-red-500 rounded-full p-1"
                  >
                    <IconTrash size={18} />
                  </ActionIcon>
                  <ActionIcon
                    title="Update supplier"
                    onClick={handleUpdate(supplier)}
                    className="hover:bg-gray-100 active:bg-gray-200 text-gray-700 rounded-full p-1"
                  >
                    <IconEdit size={18} />
                  </ActionIcon>
                </div>
              </td>
            </tr>
          )}
        />
      </Card.Section>
    </Card>
  );
};
