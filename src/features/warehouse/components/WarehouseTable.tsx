import { Button, Card } from '@mantine/core';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Table } from '@/components/elements';
import { dayjs } from '@/lib/dayjs';

import { useWarehouses } from '../api';
import { WarehouseQuery } from '../types';

const initialParams: WarehouseQuery = {
  limit: 5,
  page: 1,
};

type Props = {
  company?: number;
  toolbar?: React.ReactNode;
};

export const WarehouseTable: React.FC<Props> = ({ company, toolbar }) => {
  const [params, setParams] = useState({ ...initialParams, company });
  const { data } = useWarehouses({ params });

  function handlePage(page: number) {
    setParams({ ...params, page });
  }

  return (
    <Card p="lg" shadow="sm">
      <div className="flex items-center justify-between mb-4">
        <div className="font-bold text-lg">
          <h2 className="text-gray-800 inline">Gudang</h2>
        </div>

        <div className="flex items-center space-x-2">{toolbar}</div>
      </div>

      <Card.Section>
        <Table
          header={
            company
              ? ['Nama', 'Alamat', 'Created At', '']
              : ['Nama', 'Alamat', 'Perusahaan', 'Created At', '']
          }
          items={data?.result}
          onPageChange={handlePage}
          metadata={data?.metadata}
          renderItem={(warehouse) => (
            <tr key={warehouse.id}>
              <td>{warehouse.name}</td>
              <td>{warehouse.address || '-'}</td>
              {!company && <td>{warehouse.company.name}</td>}
              <td>{dayjs(warehouse.createdAt).format('D MMMM YYYY')}</td>
              <td>
                <div className="flex items-center space-x-2">
                  <Button component={Link} to={`/warehouse/${warehouse.id}`} size="xs">
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
