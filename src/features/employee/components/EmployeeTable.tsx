import { ActionIcon, Badge, Card, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconEdit, IconTrash } from '@tabler/icons-react';
import { useState } from 'react';

import { Table } from '@/components/elements';
import { dayjs } from '@/lib/dayjs';

import { useDeleteEmployee, useEmployees } from '../api';
import { Employee, EmployeeQuery } from '../types';

import { EmployeeUpdateForm } from './EmployeeUpdateForm';

const initialParams: EmployeeQuery = {
  limit: 5,
  page: 1,
};

export const EmployeeTable: React.FC = () => {
  const [params, setParams] = useState({ ...initialParams });
  const { data } = useEmployees({ params });
  const deleteMutation = useDeleteEmployee();

  function handlePage(page: number) {
    setParams({ ...params, page });
  }

  function handleRemove(id: number) {
    return () => {
      modals.openConfirmModal({
        title: 'Hapus Pegawai',
        children: <Text size="sm">Apakah anda yakin untuk menghapus pegawai ini?</Text>,
        centered: true,
        closeOnConfirm: false,
        onConfirm: async () => {
          await deleteMutation.mutateAsync(
            { id },
            {
              onSuccess: () => {
                notifications.show({
                  message: 'Pegawai berhasil dihapus',
                  color: 'green',
                  icon: <IconCheck />,
                });
                modals.closeAll();
              },
              onError: () => {
                notifications.show({
                  message: 'Pegawai tidak bisa dihapus',
                  color: 'red',
                });
              },
            }
          );
        },
      });
    };
  }

  function handleUpdate(employee: Employee) {
    return () => {
      modals.open({
        title: 'Update Employee',
        children: <EmployeeUpdateForm employee={employee} />,
      });
    };
  }

  return (
    <Card p="lg" shadow="sm">
      <div className="flex items-center justify-between mb-4">
        <div className="font-bold text-lg">
          <h2 className="text-gray-800 inline">Data Pegawai</h2>
        </div>
      </div>

      <Card.Section>
        <Table
          header={['User', 'No Telepon', 'Alamat', 'Status', 'Dibuat Pada', '']}
          items={data?.result}
          onPageChange={handlePage}
          metadata={data?.metadata}
          renderItem={(employee) => (
            <tr key={employee.user.username}>
              <td>
                <div>{employee.name}</div>
                <div className="text-gray-600 italic">{employee.user.username}</div>
              </td>
              <td>{employee.phonenumber || '-'}</td>
              <td>{employee.address || '-'}</td>
              <td>
                {employee.status ? (
                  <Badge color="green">Aktif</Badge>
                ) : (
                  <Badge color="red">Nonaktif</Badge>
                )}
              </td>
              <td>{dayjs(employee.createdAt).format('D MMMM YYYY')}</td>
              <td>
                <div className="flex items-center space-x-2">
                  <ActionIcon
                    title="Update pegawai"
                    onClick={handleUpdate(employee)}
                    color="blue"
                    variant="subtle"
                    radius="lg"
                  >
                    <IconEdit size={18} />
                  </ActionIcon>
                  <ActionIcon
                    title="Hapus pegawai"
                    onClick={handleRemove(employee.id)}
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
