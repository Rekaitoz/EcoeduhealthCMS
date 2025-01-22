import { Button, PasswordInput, Select, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';

import { useCreateUser } from '../api';
import { User, UserRequest } from '../types';

type Props = {
  role?: UserRequest['role'];
  onSuccess?: (result: User) => void;
};

export const UserCreateForm: React.FC<Props> = ({ role, onSuccess }) => {
  const form = useForm<UserRequest>({
    initialValues: {
      name: '',
      username: '',
      password: '',
      role: role ? role : 'superadmin',
      status: 'active',
    },
  });
  const { mutateAsync, isLoading } = useCreateUser();

  const handleSubmit = form.onSubmit(async (values) => {
    await mutateAsync(
      { data: values },
      {
        onError({ response }) {
          form.setErrors((response?.data as any).errors);
        },
        onSuccess({ result }) {
          if (onSuccess) {
            onSuccess(result);
          }
          notifications.show({
            message: 'User berhasil dibuat',
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
        <TextInput label="Nama" required {...form.getInputProps('name')} />
        <TextInput label="Username" required {...form.getInputProps('username')} />
        <PasswordInput label="Password" required {...form.getInputProps('password')} />
        {!role && (
          <Select
            label="Role"
            required
            data={[
              { label: 'Superadmin', value: 'superadmin' },
              { label: 'Owner', value: 'owner' },
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
          {...form.getInputProps('status')}
        />
      </div>

      <div className="flex items-center justify-end gap-4 mt-4">
        <Button
          type="button"
          variant="default"
          onClick={() => modals.closeAll()}
          loading={isLoading}
        >
          Batal
        </Button>
        <Button type="submit" loading={isLoading}>
          Tambah
        </Button>
      </div>
    </form>
  );
};
