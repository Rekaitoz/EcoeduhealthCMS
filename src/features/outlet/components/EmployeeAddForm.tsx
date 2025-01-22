import { Button, Select } from '@mantine/core';
import { useForm } from '@mantine/form';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';
import { useMemo, useState } from 'react';

import { useEmployees } from '@/features/employee';

import { useSaveEmployee, useOutletEmployees } from '../api';
import { OutletEmployeeDTO } from '../types';

type Props = {
  outlet: number;
  onSuccess?: () => void;
};

export const EmployeeAddForm: React.FC<Props> = ({ outlet, onSuccess }) => {
  const form = useForm<OutletEmployeeDTO>({
    initialValues: {
      type: undefined,
    },
  });
  const [selected, setSelected] = useState<number | null>(null);
  const { mutateAsync, isPending } = useSaveEmployee();
  const { data: admins } = useOutletEmployees({ id: outlet });
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

  const handleSubmit = form.onSubmit(async (values) => {
    if (selected == null) {
      return notifications.show({ message: 'Pegawai tidak boleh kosong', color: 'red' });
    }

    await mutateAsync(
      { outletId: outlet, employeeId: selected, data: values },
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
        onError: ({ response }) => {
          notifications.show({
            message: 'Admin gagal ditambahkan',
            color: 'red',
          });
          form.setErrors((response?.data as any).errors);
        },
      }
    );
  });

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-2">
        <Select
          {...form.getInputProps('type')}
          label="Jenis"
          placeholder="Pilih Jenis"
          data={[
            { label: 'Admin', value: 'admin' },
            { label: 'Pegawai', value: 'employee' },
          ]}
          required
        />
        <Select
          label="Pegawai"
          placeholder="Pilih Pegawai"
          value={selected != null ? selected.toString() : ''}
          onChange={(v) => setSelected(v ? parseInt(v) : null)}
          data={selectData}
          searchable
          nothingFoundMessage="Tidak ada pegawai"
          required
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
