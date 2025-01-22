import { useOutletContext } from 'react-router-dom';

import { Warehouse } from '../types';

type WarehouseDetailContext = {
  warehouse: Warehouse;
};

export function useWarehouseDetail() {
  return useOutletContext<WarehouseDetailContext>();
}
