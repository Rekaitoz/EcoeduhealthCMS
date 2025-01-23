import { ActionIcon, Card, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconEdit, IconNotes, IconTrash } from '@tabler/icons-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Table } from '@/components/elements';

import { useDeleteQuiz, useQuizs } from '../api';
import { Quiz, QuizQuery } from '../types';

import { QuizUpdateForm } from './QuizUpdateForm';

const initialParams: QuizQuery = {
  limit: 5,
  page: 1,
};

export const QuizTable: React.FC = () => {
  const [params, setParams] = useState({ ...initialParams });
  const { data } = useQuizs({ params });
  const deleteMutation = useDeleteQuiz();

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

  function handleUpdate(quiz: Quiz) {
    return () => {
      modals.open({
        title: 'Update Quiz',
        children: <QuizUpdateForm quiz={quiz} />,
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
          header={['Nama Quiz', 'Deskripsi', '']}
          items={data?.result}
          onPageChange={handlePage}
          metadata={data?.metadata}
          renderItem={(quiz) => (
            <tr key={quiz.id}>
              <td>
                <div>{quiz.name}</div>
              </td>
              <td>{quiz.description || '-'}</td>

              <td>
                <div className="flex items-center space-x-2">
                  <ActionIcon
                    title="Update quiz"
                    onClick={handleUpdate(quiz)}
                    color="yellow"
                    variant="subtle"
                    radius="lg"
                  >
                    <IconEdit size={18} />
                  </ActionIcon>
                  <ActionIcon
                    title="Detail quiz"
                    component={Link}
                    to={`/quiz/detail/${quiz.id}`}
                    color="blue"
                    variant="subtle"
                    radius="lg"
                  >
                    <IconNotes size={19} />
                  </ActionIcon>
                  <ActionIcon
                    title="Hapus quiz"
                    onClick={handleRemove(quiz.id)}
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
