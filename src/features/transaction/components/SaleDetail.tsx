import dayjs from 'dayjs';

import { formatCurrency } from '@/utils/format';

import { Sale } from '../types';

import { SaleStatus } from './SaleStatus';

type Props = {
  sale: Sale;
};

export const SaleDetail: React.FC<Props> = ({ sale }) => {
  return (
    <div>
      <section className="border-b border-dashed border-gray-400 pb-4">
        <div className="flex items-center justify-between text-sm mb-3">
          <div className="text-gray-600 font-medium">Kode</div>
          <div className="font-semibold">{sale.code || '-'}</div>
        </div>
        <div className="flex items-center justify-between text-sm mb-3">
          <div className="text-gray-600 font-medium">Customer</div>
          <div className="font-semibold">{sale.customer}</div>
        </div>
        <div className="flex items-center justify-between text-sm mb-3">
          <div className="text-gray-600 font-medium">Pegawai</div>
          <div className="font-semibold">{sale.user.name}</div>
        </div>
        <div className="flex items-center justify-between text-sm mb-3">
          <div className="text-gray-600 font-medium">Tanggal Transaksi</div>
          <div className="font-semibold">{dayjs(sale.createdAt).format('D MMMM YYYY HH:mm')}</div>
        </div>
        <div className="flex items-center justify-between text-sm">
          <div className="text-gray-600 font-medium">Status</div>
          <SaleStatus status={sale.status} />
        </div>
        <div className="text-sm mt-3">
          <div className="text-gray-600 font-medium mb-1">Catatan</div>
          <div className="text-gray-800 text-xs font-medium">
            {sale.note || '(Tidak ada catatan)'}
          </div>
        </div>
      </section>

      <div className="py-3">
        {sale.items.map((item) => (
          <div key={item.id} className="flex items-center justify-between mb-3 last:mb-0">
            <div>
              <div className="text-gray-700 font-semibold">{item.product.name}</div>
              <div className="text-gray-600 text-xs font-medium">
                {item.quantity} {item.product.unit} x {formatCurrency(item.price)}
              </div>
            </div>
            <div className="font-semibold text-sm">{formatCurrency(item.total)}</div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between border-t text-base border-dashed border-gray-400 pt-4">
        <div className="font-semibold">Total</div>
        <div className="font-semibold">{formatCurrency(sale.total)}</div>
      </div>
    </div>
  );
};
