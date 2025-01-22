import { ActionIcon, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconEdit, IconTrash } from '@tabler/icons-react';
import { useState } from 'react';

import { Table } from '@/components/elements';
import { dayjs } from '@/lib/dayjs';

import { useDeleteCategory, useCategories } from '../api';
import { Category, CategoryQuery } from '../types';

import { CategoryForm } from './CategoryForm';

const initialParams: CategoryQuery = {
  limit: 5,
  page: 1,
};

type Props = {
  toolbar?: React.ReactNode;
} & CategoryQuery;

export const CategoryTable: React.FC<Props> = ({ toolbar, ...props }) => {
  const [params, setParams] = useState(initialParams);
  const { data, isLoading } = useCategories({ params: { ...params, ...props } });
  const deleteMutation = useDeleteCategory();

  function handlePage(page: number) {
    setParams({ ...params, page });
  }

  function handleRemove(id: number) {
    return () => {
      modals.openConfirmModal({
        modalId: 'category-delete',
        title: 'Hapus Kategori',
        children: <Text size="sm">Apakah anda yakin untuk menghapus kategori ini?</Text>,
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
                modals.close('category-delete');
              },
              onError: () => {
                notifications.show({
                  message: 'Kategori tidak bisa dihapus',
                  color: 'red',
                });
                modals.close('category-delete');
              },
            }
          );
        },
      });
    };
  }

  function handleUpdate(category: Category) {
    return () => {
      modals.open({
        modalId: 'category-update',
        title: 'Update Kategori',
        children: (
          <CategoryForm
            category={category}
            onSuccess={() => modals.close('category-update')}
            onCancel={() => modals.close('category-update')}
          />
        ),
      });
    };
  }

  return (
    <Table
      title="Tabel Data Kategori"
      toolbar={toolbar}
      loading={isLoading}
      header={['Nama', 'Deskripsi', 'Terakhir Diubah', '']}
      items={data?.result}
      onPageChange={handlePage}
      metadata={data?.metadata}
      renderItem={(category) => (
        <tr key={category.id}>
          <td>{category.name}</td>
          <td>{category.description || '-'}</td>
          <td>{dayjs(category.updatedAt).format('D MMMM YYYY')}</td>
          <td>
            <div className="flex items-center space-x-2">
              <ActionIcon
                title="Hapus Kategori"
                onClick={handleRemove(category.id)}
                variant="subtle"
                color="red"
                radius="lg"
              >
                <IconTrash size={18} />
              </ActionIcon>
              <ActionIcon
                title="Update Kategori"
                onClick={handleUpdate(category)}
                variant="subtle"
                color="blue"
                radius="lg"
              >
                <IconEdit size={18} />
              </ActionIcon>
            </div>
          </td>
        </tr>
      )}
    />
  );
};
