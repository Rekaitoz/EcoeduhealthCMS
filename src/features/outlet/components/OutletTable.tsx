import { Button, Card } from '@mantine/core';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Table } from '@/components/elements';
import { dayjs } from '@/lib/dayjs';

import { useOutlets } from '../api';
import { OutletQuery } from '../types';

const initialParams: OutletQuery = {
  limit: 5,
  page: 1,
};

type Props = {
  toolbar?: React.ReactNode;
} & OutletQuery;

export const OutletTable: React.FC<Props> = ({ toolbar, ...props }) => {
  const [params, setParams] = useState(initialParams);
  const { data } = useOutlets({ params: { ...params, ...props } });

  function handlePage(page: number) {
    setParams({ ...params, page });
  }

  return (
    <Card p="lg" shadow="sm">
      <div className="flex items-center justify-between mb-4">
        <div className="font-bold text-lg">
          <h2 className="text-gray-800 inline">Data Outlet</h2>
        </div>

        <div className="flex items-center space-x-2">{toolbar}</div>
      </div>

      <Card.Section>
        <Table
          header={['Nama', 'Status', 'Alamat', 'Perusahaan', 'Created At', '']}
          items={data?.result}
          onPageChange={handlePage}
          metadata={data?.metadata}
          renderItem={(outlet) => (
            <tr key={outlet.id}>
              <td>{outlet.name}</td>
              <td className="capitalize">{outlet.status}</td>
              <td>{outlet.address || '-'}</td>
              <td>{outlet.company.name}</td>
              <td>{dayjs(outlet.createdAt).format('D MMMM YYYY')}</td>
              <td>
                <div className="flex items-center space-x-2">
                  <Button component={Link} to={`/outlet/${outlet.id}`} size="xs">
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
