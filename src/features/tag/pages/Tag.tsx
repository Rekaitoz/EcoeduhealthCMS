import { Button } from '@mantine/core';
import { modals } from '@mantine/modals';

import { TagCreateForm, TagTable } from '../components';

export const Tag: React.FC = () => {
  function handleAdd() {
    modals.open({
      title: 'Tambah Tag',
      children: <TagCreateForm />,
    });
  }

  return (
    <main>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Tag</h1>
        <Button onClick={handleAdd}>Tambah</Button>
      </div>

      <section className="mb-8">
        <TagTable />
      </section>
    </main>
  );
};
