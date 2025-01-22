import { PurchaseTable, SaleTable } from '@/features/transaction';

import { useOutletDetail } from '../hooks';

export const OutletTransactions: React.FC = () => {
  const { outlet } = useOutletDetail();

  return (
    <div className="space-y-6">
      <SaleTable outlet={outlet.id} />
      <PurchaseTable outlet={outlet.id} />
    </div>
  );
};
