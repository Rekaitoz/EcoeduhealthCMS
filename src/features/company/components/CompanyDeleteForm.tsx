import { Alert, Button, Card, Checkbox } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDeleteCompany } from '..';

type Props = {
  id: number;
};

export const CompanyDeleteForm: React.FC<Props> = ({ id }) => {
  const [state, setState] = useState(false);
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useDeleteCompany();

  async function handleDelete() {
    if (!state) return;

    await mutateAsync(
      { id },
      {
        onSuccess: () => {
          notifications.show({
            message: 'Perusahaan berhasil dihapus',
            color: 'green',
            icon: <IconCheck />,
          });
          navigate('/company');
        },
        onError: () => {
          notifications.show({
            message: 'Perusahaan tidak bisa dihapus',
            color: 'red',
          });
        },
      }
    );
  }

  return (
    <Card p="lg" shadow="sm">
      <header className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-lg text-gray-900">Hapus Perusahaan</h2>
      </header>

      <Alert title="Apakah Anda yakin untuk menghapus perusahaan ini?" color="yellow">
        Semua data terkait perusahaan akan terhapus.
      </Alert>

      <div className="py-4">
        <Checkbox
          label="Konfirmasi penghapusan perusahaan"
          checked={state}
          onChange={(e) => setState(e.target.checked)}
        />
      </div>

      <div className="flex items-center justify-start">
        <Button color="red" loading={isPending} onClick={handleDelete}>
          Hapus
        </Button>
      </div>
    </Card>
  );
};
