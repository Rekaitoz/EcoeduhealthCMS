import { Button, PasswordInput, Select, TextInput, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';

import { useUpdateEmployee } from '../api';
import { Employee, EmployeeDTO } from '../types';

type Props = {
  employee: Employee;
  onSuccess?: VoidFunction;
};

export const EmployeeUpdateForm: React.FC<Props> = ({ employee, onSuccess }) => {
  const form = useForm<EmployeeDTO>({
    initialValues: {
      name: employee.name,
      username: employee.user.username,
      password: '',
      address: employee.address,
      phonenumber: employee.phonenumber,
      status: employee.status,
    },
  });
  const { mutateAsync, isPending } = useUpdateEmployee();

  const handleSubmit = form.onSubmit(async (values) => {
    await mutateAsync(
      { id: employee.id, data: values },
      {
        onError({ response }) {
          form.setErrors((response?.data as any).errors);
        },
        onSuccess() {
          if (onSuccess) {
            onSuccess();
          }
          notifications.show({
            message: 'Pegawai berhasil diubah',
            color: 'green',
            icon: <IconCheck />,
          });
          modals.closeAll();
        },
      }
    );
  });

  return (
    <form className="relative" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <TextInput
          {...form.getInputProps('name')}
          label="Nama"
          placeholder="Masukan nama pegawai"
          required
        />
        <TextInput
          {...form.getInputProps('username')}
          label="Username"
          placeholder="Masukan username"
          required
        />
        <PasswordInput
          {...form.getInputProps('password')}
          label="Password"
          placeholder="Biarkan kosong. Jika, tidak berubah"
        />
        <TextInput {...form.getInputProps('phonenumber')} label="No Telepon" placeholder="+62..." />
        <Textarea
          {...form.getInputProps('address')}
          label="Alamat"
          placeholder="Masukan alamat pegawai"
        />
        <Select
          {...form.getInputProps('status')}
          label="Status"
          placeholder="Pilih Status"
          required
          data={[
            { label: 'Aktif', value: 'true' },
            { label: 'Nonaktif', value: 'false' },
          ]}
          value={
            form.values['status'] == undefined ? null : form.values['status'] ? 'true' : 'false'
          }
          onChange={(v) => form.setFieldValue('status', v == null ? undefined : v == 'true')}
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
          Simpan
        </Button>
      </div>
    </form>
  );
};
