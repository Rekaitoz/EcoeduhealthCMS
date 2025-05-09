import { Button } from '@mantine/core';
import { modals } from '@mantine/modals';

import { CategoryCreateForm, CategoryTable } from '../components';

export const Category: React.FC = () => {
  function handleAdd() {
    modals.open({
      title: 'Tambah Kategori',
      children: <CategoryCreateForm />,
    });
  }

  return (
    <main>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Kategori</h1>
        <Button onClick={handleAdd}>Tambah</Button>
      </div>

      <section className="mb-8">
        <CategoryTable />
      </section>
    </main>
  );
};
