import { Button, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDebouncedValue } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import { IconSearch } from '@tabler/icons-react';

import { CategoryForm, CategoryTable } from '../components';
import { CategoryQuery } from '../types';

export const Categories: React.FC = () => {
  const form = useForm<CategoryQuery>({
    initialValues: {
      keyword: '',
      limit: 10,
    },
  });
  const [params] = useDebouncedValue(form.values, 300);

  function handleAdd() {
    modals.open({
      modalId: 'category-create',
      title: 'Tambah Kategori',
      centered: true,
      children: (
        <CategoryForm
          onSuccess={() => modals.close('category-create')}
          onCancel={() => modals.close('category-create')}
        />
      ),
    });
  }

  return (
    <main>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-800">Data Kategori</h1>
        <Button onClick={handleAdd}>Tambah</Button>
      </div>

      <section className="space-y-4 mb-4">
        <div className="space-x-4 flex items-center">
          <div className="max-w-xs w-full">
            <TextInput
              {...form.getInputProps('keyword')}
              leftSection={<IconSearch size={16} />}
              placeholder="Cari"
            />
          </div>
        </div>
      </section>

      <section className="mb-8">
        <CategoryTable {...params} />
      </section>
    </main>
  );
};
