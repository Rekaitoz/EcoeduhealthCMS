import { Button, TextInput, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';

import { useCreateCategory, useUpdateCategory } from '../api';
import { Category, CategoryDTO } from '../types';

type Props = {
  category?: Category;
  onSuccess?: () => void;
  onCancel?: () => void;
};

export const CategoryForm: React.FC<Props> = ({ category, onSuccess, onCancel }) => {
  const createMutation = useCreateCategory();
  const updateMutation = useUpdateCategory();
  const form = useForm<CategoryDTO>({
    initialValues: {
      name: category?.name || '',
      description: category?.description || '',
    },
  });

  const handleSubmit = form.onSubmit(async (values) => {
    if (!category) {
      return await createMutation.mutateAsync(
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
              message: 'Kategori berhasil dibuat',
              color: 'green',
              icon: <IconCheck />,
            });
            modals.closeAll();
          },
        }
      );
    }

    await updateMutation.mutateAsync(
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
            message: 'Kategori berhasil dibuat',
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
          placeholder="Masukan Nama Kategori"
          required
        />
        <Textarea
          {...form.getInputProps('description')}
          label="Deskripsi"
          placeholder="Masukan Deskripsi"
        />
      </div>

      <div className="flex items-center justify-end gap-4 mt-4">
        <Button
          type="button"
          variant="default"
          onClick={onCancel}
          loading={createMutation.isPending || updateMutation.isPending}
        >
          Batal
        </Button>
        <Button type="submit" loading={createMutation.isPending || updateMutation.isPending}>
          Tambah
        </Button>
      </div>
    </form>
  );
};
