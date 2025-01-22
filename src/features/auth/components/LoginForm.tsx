import { Button, PasswordInput, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconAt, IconLock } from '@tabler/icons-react';

import { useLogin } from '../api';

export const LoginForm: React.FC = () => {
  const form = useForm({ initialValues: { username: '', password: '' } });
  const loginMutation = useLogin();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await loginMutation.mutateAsync(
      { data: form.values },
      {
        onError: ({ response }) => {
          form.setErrors((response?.data as any).errors);
        },
      }
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <TextInput
          name="username"
          placeholder="Username"
          leftSection={<IconAt size={14} />}
          {...form.getInputProps('username')}
        />
      </div>
      <div className="mb-8">
        <PasswordInput
          name="password"
          placeholder="Password"
          leftSection={<IconLock size={14} />}
          {...form.getInputProps('password')}
        />
      </div>
      <Button type="submit" fullWidth loading={loginMutation.isPending}>
        Masuk
      </Button>
    </form>
  );
};
