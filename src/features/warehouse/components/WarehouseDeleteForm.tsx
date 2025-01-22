import { Alert, Button, Card, Checkbox } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDeleteWarehouse } from '..';

type Props = {
  id: number;
};

export const WarehouseDeleteForm: React.FC<Props> = ({ id }) => {
  const [state, setState] = useState(false);
  const navigate = useNavigate();
  const { mutateAsync, isLoading } = useDeleteWarehouse();

  async function handleDelete() {
    if (!state) return;

    await mutateAsync(
      { id },
      {
        onSuccess: () => {
          notifications.show({
            message: 'Gudang berhasil dihapus',
            color: 'green',
            icon: <IconCheck />,
          });
          navigate('/warehouse');
        },
        onError: () => {
          notifications.show({
            message: 'Gudang tidak bisa dihapus',
            color: 'red',
          });
        },
      }
    );
  }

  return (
    <Card p="lg" shadow="sm">
      <header className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-lg text-gray-900">Hapus Gudang</h2>
      </header>

      <Alert title="Apakah Anda yakin untuk menghapus gudang ini?" color="yellow">
        Semua data terkait gudang akan terhapus.
      </Alert>

      <div className="py-4">
        <Checkbox
          label="Konfirmasi penghapusan gudang"
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
