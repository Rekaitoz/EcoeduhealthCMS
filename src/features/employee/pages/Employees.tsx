import { Button } from '@mantine/core';
import { modals } from '@mantine/modals';

import { EmployeeCreateForm, EmployeeTable } from '../components';

export const Employees: React.FC = () => {
  function handleAdd() {
    modals.open({
      title: 'Tambah Pegawai',
      children: <EmployeeCreateForm />,
    });
  }

  return (
    <main>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Pegawai</h1>
        <Button onClick={handleAdd}>Tambah</Button>
      </div>

      <section className="mb-8">
        <EmployeeTable />
      </section>
    </main>
  );
};
