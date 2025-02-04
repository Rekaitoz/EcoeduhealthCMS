import { Button } from '@mantine/core';
import { modals } from '@mantine/modals';

import { QuizCreateForm, QuizTable } from '../components';

export const Quiz: React.FC = () => {
  function handleAdd() {
    modals.open({
      title: 'Tambah Kuesioner',
      children: <QuizCreateForm />,
    });
  }

  return (
    <main>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Kuesioner</h1>
        <Button onClick={handleAdd}>Tambah</Button>
      </div>

      <section className="mb-8">
        <QuizTable />
      </section>
    </main>
  );
};
