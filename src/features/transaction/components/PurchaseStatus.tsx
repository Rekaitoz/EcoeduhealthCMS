import { Badge } from '@mantine/core';

import { Purchase } from '../types';

type Props = {
  status: Purchase['status'];
};

export const PurchaseStatus: React.FC<Props> = ({ status }) => {
  switch (status) {
    case 'accepted':
      return <Badge color="green">Success</Badge>;
    case 'canceled':
      return <Badge color="red">Dibatalkan</Badge>;
    default:
      return null;
  }
};
