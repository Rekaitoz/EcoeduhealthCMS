import { ActionIcon, Card, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconEdit, IconTrash } from '@tabler/icons-react';
import { useState } from 'react';

import { Table } from '@/components/elements';
import { dayjs } from '@/lib/dayjs';

import { useDeleteShift, useShifts } from '../api';
import { Shift, ShiftQuery } from '../types';

import { ShiftUpdateForm } from './ShiftUpdateForm';

const initialParams: ShiftQuery = {
  limit: 5,
  page: 1,
};

type Props = {
  company: number;
  toolbar?: React.ReactNode;
};

export const ShiftTable: React.FC<Props> = ({ company, toolbar }) => {
  const [params, setParams] = useState({ ...initialParams, company });
  const { data } = useShifts({ params });
  const deleteMutation = useDeleteShift();

  function handlePage(page: number) {
    setParams({ ...params, page });
  }

  function handleRemove(id: number) {
    return () => {
      modals.openConfirmModal({
        title: 'Hapus Shift',
        children: <Text size="sm">Apakah anda yakin untuk menghapus shift ini?</Text>,
        centered: true,
        closeOnConfirm: false,
        onConfirm: async () => {
          await deleteMutation.mutateAsync(
            { id },
            {
              onSuccess: () => {
                notifications.show({
                  message: 'Shift berhasil dihapus',
                  color: 'green',
                  icon: <IconCheck />,
                });
                modals.closeAll();
              },
              onError: () => {
                notifications.show({
                  message: 'Shift tidak bisa dihapus',
                  color: 'red',
                });
              },
            }
          );
        },
      });
    };
  }

  function handleUpdate(shift: Shift) {
    return () => {
      modals.open({
        title: 'Update Shift',
        children: <ShiftUpdateForm shift={shift} company={company} />,
      });
    };
  }

  return (
    <Card p="lg" shadow="sm">
      <div className="flex items-center justify-between mb-4">
        <div className="font-bold text-lg">
          <h2 className="text-gray-800 inline">Shift Pegawai</h2>
        </div>

        <div className="flex items-center space-x-2">{toolbar}</div>
      </div>

      <Card.Section>
        <Table
          header={['Nama', 'Deskripsi', 'Waktu', 'Last Modified', '']}
          items={data?.result}
          onPageChange={handlePage}
          metadata={data?.metadata}
          renderItem={(shift) => (
            <tr key={shift.id}>
              <td>{shift.name}</td>
              <td>{shift.description || '-'}</td>
              <td>
                {dayjs(shift.startTime, 'HH:mm:ss').format('HH.mm')} -{' '}
                {dayjs(shift.endTime, 'HH:mm:ss').format('HH.mm')}
              </td>
              <td>{dayjs(shift.updatedAt).format('D MMMM YYYY')}</td>
              <td>
                <div className="flex items-center space-x-2">
                  <ActionIcon
                    title="Remove shift"
                    onClick={handleRemove(shift.id)}
                    className="hover:bg-gray-100 active:bg-gray-200 text-red-500 rounded-full p-1"
                  >
                    <IconTrash size={18} />
                  </ActionIcon>
                  <ActionIcon
                    title="Update shift"
                    onClick={handleUpdate(shift)}
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
