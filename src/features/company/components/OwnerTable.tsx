import { Button, Card, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconPlus } from '@tabler/icons-react';

import { Table } from '@/components/elements';
import { Authorization } from '@/features/auth';
import { UserCreateForm } from '@/features/user';
import { dayjs } from '@/lib/dayjs';

import { OwnerAddForm, useAddOwner, useCompanyOwners, useRemoveOwner } from '..';

type Props = {
  company: number;
};

export const OwnerTable: React.FC<Props> = ({ company }) => {
  const { data } = useCompanyOwners({ id: company });
  const deleteMutation = useRemoveOwner();
  const addMutation = useAddOwner();

  function handleRemove(id: number) {
    return () => {
      modals.openConfirmModal({
        title: 'Hapus Owner',
        children: (
          <Text size="sm">
            Apakah anda yakin untuk menghapus hak akses company untuk owner ini?
          </Text>
        ),
        centered: true,
        closeOnConfirm: false,
        onConfirm: async () => {
          await deleteMutation.mutateAsync(
            { companyId: company, userId: id },
            {
              onSuccess: () => {
                notifications.show({
                  message: 'Owner berhasil dihapus',
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
      title: 'Tambah Owner',
      children: <OwnerAddForm company={company} />,
    });
  }

  function handleNewUser() {
    modals.open({
      title: 'User Baru',
      children: (
        <UserCreateForm
          role="owner"
          onSuccess={(user) => {
            addMutation.mutate({
              companyId: company,
              userId: user.id,
            });
          }}
        />
      ),
    });
  }

  return (
    <Card p="lg" shadow="sm">
      <div className="flex items-center justify-between mb-4">
        <div className="font-bold text-lg">
          <h2 className="text-gray-800 inline">Owner</h2>
        </div>

        <div className="flex items-center space-x-2">
          <Button size="xs" leftSection={<IconPlus size={14} />} onClick={handleAdd}>
            Add Existing
          </Button>
          <Authorization role={['owner']}>
            <Button
              size="xs"
              variant="light"
              leftSection={<IconPlus size={14} />}
              onClick={handleNewUser}
            >
              New User
            </Button>
          </Authorization>
        </div>
      </div>

      <Card.Section>
        <Table
          header={['Nama', 'Username', 'Created At', '']}
          items={data?.result ?? []}
          renderItem={(user) => (
            <tr key={user.id}>
              <td>
                <div>{user.name}</div>
              </td>
              <td>{user.username}</td>
              <td>{dayjs(user.createdAt).format('D MMMM YYYY')}</td>
              <td>
                <div className="flex items-center space-x-2">
                  <Button size="xs" color="red" onClick={handleRemove(user.id)}>
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
