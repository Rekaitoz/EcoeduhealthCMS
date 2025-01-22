import { ActionIcon, Button, Card, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconEdit, IconTrash } from '@tabler/icons-react';
import { useState } from 'react';

import { Table } from '@/components/elements';
import { Authorization } from '@/features/auth';
import { dayjs } from '@/lib/dayjs';

import { useDeleteUser, useUsers } from '../api';
import { User, UserQuery } from '../types';

import { UserUpdateForm } from './UserUpdateForm';

const initialParams: UserQuery = {
  limit: 5,
  page: 1,
};

type Props = {
  title?: string;
  company?: number;
  role?: UserQuery['role'];
  onAdd?: () => void;
};

export const UserTable: React.FC<Props> = ({ title = 'Users', role, company, onAdd }) => {
  const [params, setParams] = useState({ ...initialParams, role, company });
  const { data } = useUsers({ params });
  const deleteMutation = useDeleteUser();

  function handlePage(page: number) {
    setParams({ ...params, page });
  }

  function handleRemove(id: number) {
    return () => {
      modals.openConfirmModal({
        title: 'Hapus User',
        children: <Text size="sm">Apakah anda yakin untuk menghapus user ini?</Text>,
        centered: true,
        closeOnConfirm: false,
        onConfirm: async () => {
          await deleteMutation.mutateAsync(
            { id },
            {
              onSuccess: () => {
                notifications.show({
                  message: 'User berhasil dihapus',
                  color: 'green',
                  icon: <IconCheck />,
                });
                modals.closeAll();
              },
              onError: () => {
                notifications.show({
                  message: 'User tidak bisa dihapus',
                  color: 'red',
                });
              },
            }
          );
        },
      });
    };
  }

  function handleUpdate(user: User) {
    return () => {
      modals.open({
        title: 'Update User',
        children: <UserUpdateForm user={user} />,
      });
    };
  }

  return (
    <Card p="lg" shadow="sm">
      <div className="flex items-center justify-between mb-4">
        <div className="font-bold text-lg">
          <h2 className="text-gray-800 inline">{title} </h2>
        </div>

        <Authorization role={['owner']}>
          {onAdd && (
            <Button size="xs" onClick={onAdd}>
              Tambah
            </Button>
          )}
        </Authorization>
      </div>

      <Card.Section>
        <Table
          header={['User', 'Role', 'Created At', '']}
          items={data?.result}
          onPageChange={handlePage}
          metadata={data?.metadata}
          renderItem={(user) => (
            <tr key={user.username}>
              <td>
                <div>{user.name}</div>
                <div className="text-gray-600 italic">{user.username}</div>
              </td>
              <td className="capitalize">{user.role}</td>
              <td>{dayjs(user.createdAt).format('D MMMM YYYY')}</td>
              <td>
                <Authorization role={['owner']}>
                  <div className="flex items-center space-x-2">
                    <ActionIcon
                      title="Remove user"
                      onClick={handleRemove(user.id)}
                      className="hover:bg-gray-100 active:bg-gray-200 text-red-500 rounded-full p-1"
                    >
                      <IconTrash size={18} />
                    </ActionIcon>
                    <ActionIcon
                      title="Update user"
                      onClick={handleUpdate(user)}
                      className="hover:bg-gray-100 active:bg-gray-200 text-gray-700 rounded-full p-1"
                    >
                      <IconEdit size={18} />
                    </ActionIcon>
                  </div>
                </Authorization>
              </td>
            </tr>
          )}
        />
      </Card.Section>
    </Card>
  );
};
