import { Button, TextInput, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';

import { useUpdateCategory } from '../api';
import { CategoryType, CategoryDTO } from '../types';

type Props = {
  category: CategoryType;
  onSuccess?: VoidFunction;
};

export const CategoryUpdateForm: React.FC<Props> = ({ category, onSuccess }) => {
  const form = useForm<CategoryDTO>({
    initialValues: {
      name: category.name,
      description: category.description,
    },
  });

  const { mutateAsync, isPending } = useUpdateCategory();

  const handleSubmit = form.onSubmit(async (values) => {
    await mutateAsync(
      { id: category.id, data: values },
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
          label="Nama Category"
          placeholder="Masukan Nama Category"
          required
        />
        <Textarea
          {...form.getInputProps('description')}
          label="Deksripsi"
          placeholder="Masukan Dekskripsi Category"
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
