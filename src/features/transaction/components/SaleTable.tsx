import { Button, Card } from '@mantine/core';
import { modals } from '@mantine/modals';
import { useState } from 'react';

import { Table } from '@/components/elements';
import { dayjs } from '@/lib/dayjs';
import { formatCurrency } from '@/utils/format';

import { useSales } from '../api';
import { Sale, SaleQuery } from '../types';

import { SaleDetail } from './SaleDetail';
import { SaleStatus } from './SaleStatus';

const initialParams: SaleQuery = {
  limit: 5,
  page: 1,
};

type Props = {
  outlet: number;
};

export const SaleTable: React.FC<Props> = ({ outlet }) => {
  const [params, setParams] = useState({ ...initialParams, outlet });
  const { data } = useSales({ params });

  function handlePage(page: number) {
    setParams({ ...params, page });
  }

  function handleDetail(sale: Sale) {
    return () => {
      modals.open({
        title: 'Detail Penjualan',
        children: <SaleDetail sale={sale} />,
      });
    };
  }

  return (
    <Card p="lg" shadow="sm">
      <div className="flex items-center justify-between mb-4">
        <div className="font-bold text-lg">
          <h2 className="text-gray-800 inline">Penjualan</h2>
        </div>
      </div>

      <Card.Section>
        <Table
          header={[
            'Kode Transaksi',
            'Tanggal Transaksi',
            'Customer',
            'Status',
            { title: 'Total', align: 'right' },
            '',
          ]}
          items={data?.result}
          onPageChange={handlePage}
          metadata={data?.metadata}
          renderItem={(sale) => (
            <tr key={sale.id}>
              <td>{sale.code}</td>
              <td>
                <div>{dayjs(sale.date).format('dddd, D MMMM YYYY HH:mm')}</div>
                <div className="text-gray-600">{dayjs(sale.date).fromNow()}</div>
              </td>
              <td>{sale.customer}</td>
              <td>
                <SaleStatus status={sale.status} />
              </td>
              <td className="text-right">{formatCurrency(sale.total)}</td>
              <td>
                <Button onClick={handleDetail(sale)} size="xs">
                  Detail
                </Button>
              </td>
            </tr>
          )}
        />
      </Card.Section>
    </Card>
  );
};
