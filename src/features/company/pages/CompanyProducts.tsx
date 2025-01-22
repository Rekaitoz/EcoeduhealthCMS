import { Button } from '@mantine/core';
import { modals } from '@mantine/modals';
import { Link } from 'react-router-dom';

import { ProductTable, SupplierCreateForm, SupplierTable } from '@/features/product';

import { useCompanyDetail } from '../hooks';

export const CompanyProducts: React.FC = () => {
  const { company } = useCompanyDetail();

  function handleAddSupplier() {
    modals.open({
      title: 'Tambah Supplier',
      children: <SupplierCreateForm company={company.id} />,
    });
  }

  return (
    <div className="space-y-6">
      <ProductTable
        company={company.id}
        toolbar={
          <>
            <Button size="xs" component={Link} to="/product/add">
              Tambah
            </Button>
          </>
        }
      />

      <SupplierTable company={company.id} onAdd={handleAddSupplier} />
    </div>
  );
};
