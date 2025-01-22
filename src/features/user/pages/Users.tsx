import { Button } from '@mantine/core';
import { modals } from '@mantine/modals';

import { Authorization } from '@/features/auth';

import { UserCreateForm, UserTable } from '../components';

export const Users: React.FC = () => {
  function handleAdd() {
    modals.open({
      title: 'Tambah User',
      children: <UserCreateForm />,
    });
  }

  return (
    <main>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">User</h1>
        <Authorization role={['owner']}>
          <Button onClick={handleAdd}>Tambah</Button>
        </Authorization>
      </div>

      {/* <section className="mb-8">
        <UserTable role="-employee" />
      </section> */}
    </main>
  );
};
