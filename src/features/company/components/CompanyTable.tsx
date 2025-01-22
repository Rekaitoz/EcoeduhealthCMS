import { Button, Card } from '@mantine/core';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Table } from '@/components/elements';
import { dayjs } from '@/lib/dayjs';

import { useCompanies } from '../api';
import { CompanyQuery } from '../types';

const initialParams: CompanyQuery = {
  limit: 5,
  page: 1,
};

export const CompanyTable: React.FC = () => {
  const [params, setParams] = useState(initialParams);
  const { data } = useCompanies({ params });

  function handlePage(page: number) {
    setParams({ ...params, page });
  }

  return (
    <Card p="lg" shadow="sm">
      <div className="flex items-center justify-between mb-4">
        <div className="font-bold text-lg">
          <h2 className="text-gray-800 inline">Data Perusahaan</h2>
        </div>
      </div>

      <Card.Section>
        <Table
          header={['Nama', 'Region', 'Created At', '']}
          items={data?.result}
          onPageChange={handlePage}
          metadata={data?.metadata}
          renderItem={(company) => (
            <tr key={company.id}>
              <td>{company.name}</td>
              <td>{company.region}</td>
              <td>{dayjs(company.createdAt).format('D MMMM YYYY')}</td>
              <td>
                <div className="flex items-center space-x-2">
                  <Button component={Link} to={`/company/${company.id}`} size="xs">
                    Detail
                  </Button>
                </div>
              </td>
            </tr>
          )}
        />
      </Card.Section>
    </Card>
  );
};
