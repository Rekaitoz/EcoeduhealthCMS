import { Button, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';

import { useCreateCompany } from '../api';
import { CompanyDTO } from '../types';

type Props = {
  onSuccess?: VoidFunction;
};

export const CompanyCreateForm: React.FC<Props> = ({ onSuccess }) => {
  const form = useForm<CompanyDTO>({
    initialValues: {
      name: '',
      region: '',
    },
  });
  const { mutateAsync, isPending } = useCreateCompany();

  const handleSubmit = form.onSubmit(async (values) => {
    await mutateAsync(
      { data: values },
      {
        onError({ response }) {
          form.setErrors((response?.data as any).errors);
        },
        onSuccess() {
          if (onSuccess) {
            onSuccess();
          }
          notifications.show({
            message: 'Perusahaan berhasil dibuat',
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
          placeholder="Masukan nama perusahaan"
          required
        />
        <TextInput
          {...form.getInputProps('region')}
          label="Region"
          placeholder="Masukan region"
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
