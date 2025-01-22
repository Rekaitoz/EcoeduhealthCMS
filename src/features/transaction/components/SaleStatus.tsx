import { Badge } from '@mantine/core';

import { Sale } from '../types';

type Props = {
  status: Sale['status'];
};

export const SaleStatus: React.FC<Props> = ({ status }) => {
  switch (status) {
    case 'approved':
      return <Badge color="green">Approved</Badge>;
    case 'accepted':
      return <Badge color="gray">Diterima</Badge>;
    case 'canceled':
      return <Badge color="red">Dibatalkan</Badge>;
    default:
      return null;
  }
};
