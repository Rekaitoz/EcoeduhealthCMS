import { Button, TextInput, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';

import { useUpdateTag } from '../api';
import { TagType, TagDTO } from '../types';

type Props = {
  tag: TagType;
  onSuccess?: VoidFunction;
};

export const TagUpdateForm: React.FC<Props> = ({ tag, onSuccess }) => {
  const form = useForm<TagDTO>({
    initialValues: {
      name: tag.name,
      description: tag.description,
    },
  });

  const { mutateAsync, isPending } = useUpdateTag();

  const handleSubmit = form.onSubmit(async (values) => {
    await mutateAsync(
      { id: tag.id, data: values },
      {
        onError({ response }) {
          form.setErrors((response?.data as any).errors);
        },
        onSuccess() {
          if (onSuccess) {
            onSuccess();
          }
          notifications.show({
            message: 'Kuesioner berhasil diubah',
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
          label="Nama Tag"
          placeholder="Masukan Nama Tag"
          required
        />
        <Textarea
          {...form.getInputProps('description')}
          label="Deksripsi"
          placeholder="Masukan Dekskripsi Tag"
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
          Simpan
        </Button>
      </div>
    </form>
  );
};
