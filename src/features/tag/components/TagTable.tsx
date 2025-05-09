import { ActionIcon, Card, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconEdit, IconTrash } from '@tabler/icons-react';
import { useState } from 'react';

import { Table } from '@/components/elements';

import { useDeleteTag, useTags } from '../api';
import { TagType, TagQuery } from '../types';

import { TagUpdateForm } from './TagUpdateForm';

const initialParams: TagQuery = {
  limit: 5,
  page: 1,
};

export const TagTable: React.FC = () => {
  const [params, setParams] = useState({ ...initialParams });
  const { data } = useTags({ params });
  const deleteMutation = useDeleteTag();

  function handlePage(page: number) {
    setParams({ ...params, page });
  }

  function handleRemove(id: number) {
    return () => {
      modals.openConfirmModal({
        title: 'Hapus Kuesioner',
        children: <Text size="sm">Apakah anda yakin untuk menghapus Tag ini?</Text>,
        centered: true,
        closeOnConfirm: false,
        onConfirm: async () => {
          await deleteMutation.mutateAsync(
            { id },
            {
              onSuccess: () => {
                notifications.show({
                  message: 'Tag berhasil dihapus',
                  color: 'green',
                  icon: <IconCheck />,
                });
                modals.closeAll();
              },
              onError: () => {
                notifications.show({
                  message: 'Tag tidak bisa dihapus',
                  color: 'red',
                });
              },
            }
          );
        },
      });
    };
  }

  function handleUpdate(tag: TagType) {
    return () => {
      modals.open({
        title: 'Update Kategori',
        children: <TagUpdateForm tag={tag} />,
      });
    };
  }

  return (
    <Card p="lg" shadow="sm">
      <div className="flex items-center justify-between mb-4">
        <div className="font-bold text-lg">
          <h2 className="text-gray-800 inline">Data Tag</h2>
        </div>
      </div>

      <Card.Section>
        <Table
          header={['Nama Kategori', 'Deskripsi', '']}
          items={data?.result}
          onPageChange={handlePage}
          metadata={data?.metadata}
          renderItem={(tag) => (
            <tr key={tag.id}>
              <td>
                <div>{tag.name}</div>
              </td>
              <td>{tag.description || '-'}</td>

              <td>
                <div className="flex items-center space-x-2">
                  <ActionIcon
                    title="Update Tag"
                    onClick={handleUpdate(tag)}
                    color="yellow"
                    variant="subtle"
                    radius="lg"
                  >
                    <IconEdit size={18} />
                  </ActionIcon>
                  <ActionIcon
                    title="Hapus Tag"
                    onClick={handleRemove(tag.id)}
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
