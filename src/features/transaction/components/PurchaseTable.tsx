import { Button, Card } from '@mantine/core';
import { modals } from '@mantine/modals';
import { useState } from 'react';

import { Table } from '@/components/elements';
import { dayjs } from '@/lib/dayjs';
import { formatCurrency } from '@/utils/format';

import { usePurchases } from '../api';
import { Purchase, PurchaseQuery } from '../types';

import { PurchaseDetail } from './PurchaseDetail';
import { PurchaseStatus } from './PurchaseStatus';

const initialParams: PurchaseQuery = {
  limit: 5,
  page: 1,
};

type Props = {
  outlet: number;
};

export const PurchaseTable: React.FC<Props> = ({ outlet }) => {
  const [params, setParams] = useState({ ...initialParams, outlet });
  const { data } = usePurchases({ params });

  function handlePage(page: number) {
    setParams({ ...params, page });
  }

  function handleDetail(purchase: Purchase) {
    return () => {
      modals.open({
        title: 'Detail Pembelian',
        children: <PurchaseDetail purchase={purchase} />,
      });
    };
  }

  return (
    <Card p="lg" shadow="sm">
      <div className="flex items-center justify-between mb-4">
        <div className="font-bold text-lg">
          <h2 className="text-gray-800 inline">Pembelian</h2>
        </div>
      </div>

      <Card.Section>
        <Table
          header={[
            'Kode Transaksi',
            'Tanggal Transaksi',
            'Nama Pegawai',
            'Status',
            { title: 'Jumlah', align: 'right' },
            '',
          ]}
          items={data?.result}
          onPageChange={handlePage}
          metadata={data?.metadata}
          renderItem={(purchase) => (
            <tr key={purchase.id}>
              <td>{purchase.code}</td>
              <td>
                <div>{dayjs(purchase.date).format('dddd, D MMMM YYYY HH:mm')}</div>
                <div className="text-gray-600">{dayjs(purchase.date).fromNow()}</div>
              </td>
              <td>{purchase.user.name}</td>
              <td>
                <PurchaseStatus status={purchase.status} />
              </td>
              <td className="text-right">{formatCurrency(purchase.total)}</td>
              <td>
                <Button onClick={handleDetail(purchase)} size="xs">
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
