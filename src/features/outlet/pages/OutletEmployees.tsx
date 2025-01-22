import { Button } from '@mantine/core';
import { modals } from '@mantine/modals';

import { EmployeeAddForm, OutletEmployeeTable } from '../components';
import { useOutletDetail } from '../hooks';

export const OutletEmployees: React.FC = () => {
  const { outlet } = useOutletDetail();

  function handleAdd() {
    modals.open({
      title: 'Tambah Pegawai Outlet',
      centered: true,
      children: <EmployeeAddForm outlet={outlet.id} />,
    });
  }

  return (
    <div className="space-y-6">
      <OutletEmployeeTable
        outlet={outlet}
        toolbar={
          <>
            <Button size="xs" onClick={handleAdd}>
              Add Existing
            </Button>
          </>
        }
      />
    </div>
  );
};
