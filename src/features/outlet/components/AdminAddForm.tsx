import { Button, Select } from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';
import { useMemo, useState } from 'react';

import { useEmployees } from '@/features/employee';

import { useAddAdmin, useOutletAdmins } from '..';

type Props = {
  outlet: number;
  onSuccess?: () => void;
};

export const AdminAddForm: React.FC<Props> = ({ outlet, onSuccess }) => {
  const [selected, setSelected] = useState<number | null>(null);
  const { mutateAsync, isPending } = useAddAdmin();
  const { data: admins } = useOutletAdmins({ id: outlet });
  const { data: employees } = useEmployees({ params: { limit: -1 } });

  const selectData = useMemo(() => {
    const adminIds = (admins?.result ?? []).map(({ id }) => id);

    return (employees?.result ?? [])
      .filter(({ id }) => !adminIds.includes(id))
      .map((employee) => ({
        label: `${employee.name} (${employee.user.username})`,
        value: employee.id.toString(),
      }));
  }, [admins, employees]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (selected == null) {
      return notifications.show({ message: 'Pegawai tidak boleh kosong', color: 'red' });
    }

    await mutateAsync(
      { outletId: outlet, employeeId: selected },
      {
        onSuccess: () => {
          if (onSuccess) {
            onSuccess();
          }
          notifications.show({
            message: 'Admin berhasil ditambahkan',
            color: 'green',
            icon: <IconCheck />,
          });
          modals.closeAll();
        },
        onError: () => {
          notifications.show({
            message: 'Admin gagal ditambahkan',
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
          label="Pegawai"
          placeholder="Pilih Pegawai"
          value={selected != null ? selected.toString() : ''}
          onChange={(v) => setSelected(v ? parseInt(v) : null)}
          data={selectData}
          searchable
          nothingFoundMessage="Tidak ada pegawai"
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
