import { ActionIcon, Card, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconEdit, IconTrash } from '@tabler/icons-react';
import { useState } from 'react';

import { Table } from '@/components/elements';

import { useDeleteCategory, useCategorys } from '../api';
import { CategoryType, CategoryQuery } from '../types';

import { CategoryUpdateForm } from './CategoryUpdateForm';

const initialParams: CategoryQuery = {
  limit: 5,
  page: 1,
};

export const CategoryTable: React.FC = () => {
  const [params, setParams] = useState({ ...initialParams });
  const { data } = useCategorys({ params });
  const deleteMutation = useDeleteCategory();

  function handlePage(page: number) {
    setParams({ ...params, page });
  }

  function handleRemove(id: number) {
    return () => {
      modals.openConfirmModal({
        title: 'Hapus Kuesioner',
        children: <Text size="sm">Apakah anda yakin untuk menghapus Kategori ini?</Text>,
        centered: true,
        closeOnConfirm: false,
        onConfirm: async () => {
          await deleteMutation.mutateAsync(
            { id },
            {
              onSuccess: () => {
                notifications.show({
                  message: 'Kategori berhasil dihapus',
                  color: 'green',
                  icon: <IconCheck />,
                });
                modals.closeAll();
              },
              onError: () => {
                notifications.show({
                  message: 'Kategori tidak bisa dihapus',
                  color: 'red',
                });
              },
            }
          );
        },
      });
    };
  }

  function handleUpdate(category: CategoryType) {
    return () => {
      modals.open({
        title: 'Update Kategori',
        children: <CategoryUpdateForm category={category} />,
      });
    };
  }

  return (
    <Card p="lg" shadow="sm">
      <div className="flex items-center justify-between mb-4">
        <div className="font-bold text-lg">
          <h2 className="text-gray-800 inline">Data Kategori</h2>
        </div>
      </div>

      <Card.Section>
        <Table
          header={['Nama Kategori', 'Deskripsi', '']}
          items={data?.result}
          onPageChange={handlePage}
          metadata={data?.metadata}
          renderItem={(category) => (
            <tr key={category.id}>
              <td>
                <div>{category.name}</div>
              </td>
              <td>{category.description || '-'}</td>

              <td>
                <div className="flex items-center space-x-2">
                  <ActionIcon
                    title="Update Kuesioner"
                    onClick={handleUpdate(category)}
                    color="yellow"
                    variant="subtle"
                    radius="lg"
                  >
                    <IconEdit size={18} />
                  </ActionIcon>
                  <ActionIcon
                    title="Hapus Kuesioner"
                    onClick={handleRemove(category.id)}
                    color="red"
                    variant="subtle"
                    radius="lg"
                  >
                    <IconTrash size={18} />
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
