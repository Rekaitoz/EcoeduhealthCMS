import { Button } from '@mantine/core';
import { modals } from '@mantine/modals';

import { Authorization } from '@/features/auth';

import { CompanyCreateForm, CompanyTable } from '../components';

export const Companies: React.FC = () => {
  function handleAdd() {
    modals.open({
      title: 'Tambah Perusahaan',
      children: <CompanyCreateForm />,
    });
  }

  return (
    <main>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Perusahaan</h1>
        <Authorization role={['owner']}>
          <Button onClick={handleAdd}>Tambah</Button>
        </Authorization>
      </div>

      <section className="mb-8">
        <CompanyTable />
      </section>
    </main>
  );
};
