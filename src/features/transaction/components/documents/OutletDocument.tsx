import { Document } from '@react-pdf/renderer';

import { Outlet } from '@/features/outlet';

import { SalesSummary, PurchasesSummary } from '../../types';

import { OutletSection } from './OutletSection';

export type OutletDocumentProps = {
  outlet: Outlet;
  startDate: Date;
  endDate: Date;
  sales: SalesSummary[];
  purchases: PurchasesSummary[];
};

export const OutletDocument: React.FC<OutletDocumentProps> = (props) => {
  return (
    <Document>
      <OutletSection {...props} />
    </Document>
  );
};
