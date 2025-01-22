import { Button, Select } from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';
import { useMemo, useState } from 'react';

import { useUsers } from '@/features/user';

import { useAddOwner, useCompanyOwners } from '..';

type Props = {
  company: number;
  onSuccess?: () => void;
};

export const OwnerAddForm: React.FC<Props> = ({ company, onSuccess }) => {
  const [selected, setSelected] = useState<number | null>(null);
  const { mutateAsync, isPending } = useAddOwner();
  const { data: owners } = useCompanyOwners({ id: company });
  const { data: users } = useUsers({ params: { limit: -1, role: 'owner' } });

  const selectData = useMemo(() => {
    const ownerIds = (owners?.result ?? []).map(({ id }) => id);

    return (users?.result ?? [])
      .filter(({ id }) => !ownerIds.includes(id))
      .map((user) => ({
        label: `${user.name} (${user.username})`,
        value: user.id.toString(),
      }));
  }, [owners, users]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (selected == null) {
      return notifications.show({ message: 'User tidak boleh kosong', color: 'red' });
    }

    await mutateAsync(
      { companyId: company, userId: selected },
      {
        onSuccess: () => {
          if (onSuccess) {
            onSuccess();
          }
          notifications.show({
            message: 'Owner berhasil ditambahkan',
            color: 'green',
            icon: <IconCheck />,
          });
          modals.closeAll();
        },
        onError: () => {
          notifications.show({
            message: 'Owner gagal ditambahkan',
            color: 'red',
          });
        },
      }
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-2">
        <Select
          label="User"
          placeholder="Pilih User"
          value={selected != null ? selected.toString() : ''}
          onChange={(v) => setSelected(v ? parseInt(v) : null)}
          data={selectData}
          searchable
          nothingFoundMessage="Tidak ada user"
        />
      </div>
      <div className="flex items-center justify-end gap-4 mt-4">
        <Button
          type="button"
          variant="default"
          onClick={() => modals.closeAll()}
          loading={isPending}
        >
          Batal
        </Button>
        <Button type="submit" loading={isPending}>
          Tambah
        </Button>
      </div>
    </form>
  );
};
