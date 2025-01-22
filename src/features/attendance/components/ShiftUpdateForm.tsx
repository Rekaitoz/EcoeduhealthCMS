import { Button, TextInput, Textarea } from '@mantine/core';
import { TimeInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';

import { useUpdateShift } from '../api';
import { Shift, ShiftRequest } from '../types';

type Props = {
  company: number;
  shift: Shift;
  onSuccess?: VoidFunction;
};

export const ShiftUpdateForm: React.FC<Props> = ({ shift, company, onSuccess }) => {
  const form = useForm<ShiftRequest>({
    initialValues: {
      name: shift.name,
      description: shift.description,
      startTime: shift.startTime,
      endTime: shift.endTime,
      company,
    },
  });
  const { mutateAsync, isLoading } = useUpdateShift();

  const handleSubmit = form.onSubmit(async (values) => {
    await mutateAsync(
      { id: shift.id, data: values },
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
          Simpan
        </Button>
      </div>
    </form>
  );
};
