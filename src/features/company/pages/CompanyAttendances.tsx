import { Button } from '@mantine/core';
import { modals } from '@mantine/modals';

import { ShiftCreateForm, ShiftTable } from '@/features/attendance';

import { useCompanyDetail } from '../hooks';

export const CompanyAttendances: React.FC = () => {
  const { company } = useCompanyDetail();

  function handleAddOutlet() {
    modals.open({
      title: 'Tambah Shift',
      children: <ShiftCreateForm company={company.id} />,
    });
  }

  return (
    <>
      <div className="space-y-6">
        <ShiftTable
          company={company.id}
          toolbar={
            <>
              <Button size="xs" onClick={handleAddOutlet}>
                Tambah
              </Button>
            </>
          }
        />
      </div>
    </>
  );
};
