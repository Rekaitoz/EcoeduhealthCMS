import { Alert, Button, Card, Checkbox } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDeleteOutlet } from '..';

type Props = {
  id: number;
};

export const OutletDeleteForm: React.FC<Props> = ({ id }) => {
  const [state, setState] = useState(false);
  const navigate = useNavigate();
  const { mutateAsync, isLoading } = useDeleteOutlet();

  async function handleDelete() {
    if (!state) return;

    await mutateAsync(
      { id },
      {
        onSuccess: () => {
          notifications.show({
            message: 'Outlet berhasil dihapus',
            color: 'green',
            icon: <IconCheck />,
          });
          navigate('/outlet');
        },
        onError: () => {
          notifications.show({
            message: 'Outlet tidak bisa dihapus',
            color: 'red',
          });
        },
      }
    );
  }

  return (
    <Card p="lg" shadow="sm">
      <header className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-lg text-gray-900">Hapus Outlet</h2>
      </header>

      <Alert title="Apakah Anda yakin untuk menghapus outlet ini?" color="yellow">
        Semua data terkait outlet akan terhapus.
      </Alert>

      <div className="py-4">
        <Checkbox
          label="Konfirmasi penghapusan outlet"
          checked={state}
          onChange={(e) => setState(e.target.checked)}
        />
      </div>

      <div className="flex items-center justify-start">
        <Button color="red" loading={isLoading} onClick={handleDelete}>
          Hapus
        </Button>
      </div>
    </Card>
  );
};
