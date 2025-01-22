import { Button, TextInput, Textarea } from '@mantine/core';
import { TimeInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';

import { useCreateShift } from '../api';
import { ShiftRequest } from '../types';

type Props = {
  company: number;
  onSuccess?: VoidFunction;
};

export const ShiftCreateForm: React.FC<Props> = ({ company, onSuccess }) => {
  const form = useForm<ShiftRequest>({
    initialValues: {
      name: '',
      description: '',
      startTime: '',
      endTime: '',
      company,
    },
  });
  const { mutateAsync, isLoading } = useCreateShift();

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
            message: 'Shift berhasil dibuat',
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
        <TextInput {...form.getInputProps('name')} label="Nama" required />
        <Textarea {...form.getInputProps('description')} label="Deskripsi" />
        <TimeInput {...form.getInputProps('startTime')} label="Waktu Mulai" required />
        <TimeInput {...form.getInputProps('endTime')} label="Waktu Akhir" required />
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
