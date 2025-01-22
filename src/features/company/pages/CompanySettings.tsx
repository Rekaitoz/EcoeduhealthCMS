import { Card } from '@mantine/core';

import { CompanyDeleteForm, CompanyUpdateForm } from '..';
import { useCompanyDetail } from '../hooks';

export const CompanySettings: React.FC = () => {
  const { company } = useCompanyDetail();

  return (
    <div className="space-y-6">
      <Card p="lg" shadow="sm">
        <header className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-lg text-gray-900">Informasi Perusahaan</h2>
        </header>
        <CompanyUpdateForm company={company} />
      </Card>

      <CompanyDeleteForm id={company.id} />
    </div>
  );
};
