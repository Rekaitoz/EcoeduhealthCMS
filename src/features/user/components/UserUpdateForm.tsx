import { Button, PasswordInput, Select, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';

import { useUpdateUser } from '../api';
import { User, UserRequest } from '../types';

type Props = {
  user: User;
  role?: UserRequest['role'];
  onSuccess?: VoidFunction;
};

export const UserUpdateForm: React.FC<Props> = ({ user, role, onSuccess }) => {
  const form = useForm<UserRequest>({
    initialValues: {
      name: user.name,
      username: user.username,
      password: '',
      role: user.role,
      statusTemp: user.status ? 'active' : 'inactive',
    },
  });

  const { mutateAsync, isPending } = useUpdateUser({
    config: {
      onError({ response }) {
        form.setErrors((response?.data as any).errors);
      },
      onSuccess() {
        if (onSuccess) {
          onSuccess();
        }
        notifications.show({
          message: 'User berhasil diubah',
          color: 'green',
          icon: <IconCheck />,
        });
        modals.closeAll();
      },
    },
  });

  const handleSubmit = form.onSubmit(async (values) => {
    await mutateAsync({ id: user.id, data: { ...values, status: values.statusTemp === 'active' } });
  });

  return (
    <form className="relative" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <TextInput label="Nama" required {...form.getInputProps('name')} />
        <TextInput label="Username" required {...form.getInputProps('username')} />
        <PasswordInput
          label="Password"
          placeholder="Biarkan kosong. Jika, tidak berubah"
          {...form.getInputProps('password')}
        />
        {!role && (
          <Select
            label="Role"
            required
            data={[
              { label: 'Admin', value: 'admin' },
              { label: 'User', value: 'user' },
            ]}
            {...form.getInputProps('role')}
          />
        )}
        <Select
          label="Status"
          required
          data={[
            { label: 'Active', value: 'active' },
            { label: 'Inactive', value: 'inactive' },
          ]}
          {...form.getInputProps('statusTemp')}
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
