import { Button, Card, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';

import { Table } from '@/components/elements';
import { dayjs } from '@/lib/dayjs';

import { AdminAddForm, useOutletAdmins, useRemoveAdmin } from '..';

type Props = {
  outlet: number;
};

export const AdminTable: React.FC<Props> = ({ outlet }) => {
  const { data } = useOutletAdmins({ id: outlet });
  const deleteMutation = useRemoveAdmin();

  function handleRemove(id: number) {
    return () => {
      modals.openConfirmModal({
        title: 'Hapus Admin',
        children: (
          <Text size="sm">Apakah anda yakin untuk menghapus hak akses outlet untuk admin ini?</Text>
        ),
        centered: true,
        closeOnConfirm: false,
        onConfirm: async () => {
          await deleteMutation.mutateAsync(
            { outletId: outlet, employeeId: id },
            {
              onSuccess: () => {
                notifications.show({
                  message: 'Admin berhasil dihapus',
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
      title: 'Tambah Admin',
      children: <AdminAddForm outlet={outlet} />,
    });
  }

  return (
    <Card p="lg" shadow="sm">
      <div className="flex items-center justify-between mb-4">
        <div className="font-bold text-lg">
          <h2 className="text-gray-800 inline">Admin</h2>
        </div>

        <div className="flex items-center space-x-2">
          <Button size="xs" onClick={handleAdd}>
            Tambah
          </Button>
        </div>
      </div>

      <Card.Section>
        <Table
          header={['User', 'No Telepon', 'Alamat', 'Created At', '']}
          items={data?.result ?? []}
          renderItem={(employee) => (
            <tr key={employee.id}>
              <td>
                <div>{employee.name}</div>
                <div className="text-gray-600 italic">{employee.user.username}</div>
              </td>
              <td>{employee.phonenumber || '-'}</td>
              <td>{employee.address || '-'}</td>
              <td>{dayjs(employee.createdAt).format('D MMMM YYYY')}</td>
              <td>
                <div className="flex items-center space-x-2">
                  <Button size="xs" color="red" onClick={handleRemove(employee.id)}>
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
