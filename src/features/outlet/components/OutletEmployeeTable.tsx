import { Button, Card } from '@mantine/core';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Table } from '@/components/elements';
import { dayjs } from '@/lib/dayjs';

import { useOutletEmployees } from '../api';
import { Outlet, OutletEmployeeQuery } from '../types';

const initialParams: OutletEmployeeQuery = {
  limit: 5,
  page: 1,
};

type Props = {
  outlet: Outlet;
  toolbar?: React.ReactNode;
} & OutletEmployeeQuery;

export const OutletEmployeeTable: React.FC<Props> = ({ outlet, toolbar, ...props }) => {
  const [params, setParams] = useState(initialParams);
  const { data } = useOutletEmployees({ id: outlet.id, params: { ...params, ...props } });

  function handlePage(page: number) {
    setParams({ ...params, page });
  }

  return (
    <Card p="lg" shadow="sm">
      <div className="flex items-center justify-between mb-4">
        <div className="font-bold text-lg">
          <h2 className="text-gray-800 inline">Data Pegawai</h2>
        </div>

        <div className="flex items-center space-x-2">{toolbar}</div>
      </div>

      <Card.Section>
        <Table
          header={['User', 'No Telepon', 'Jenis', 'Ditambahkan Pada', '']}
          items={data?.result}
          onPageChange={handlePage}
          metadata={data?.metadata}
          renderItem={(item) => (
            <tr key={item.id}>
              <td>
                <div>{item.employee.name}</div>
                <div className="text-gray-600 italic">{item.employee.user.username}</div>
              </td>
              <td>{item.employee.phonenumber}</td>
              <td>{item.type}</td>
              <td>{dayjs(item.createdAt).format('D MMMM YYYY')}</td>
              <td>
                <div className="flex items-center space-x-2">
                  <Button component={Link} to={`/outlet/${item.id}`} size="xs">
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
