import { useOutletContext } from 'react-router-dom';

import { Outlet } from '../types';

type OutletDetailContext = {
  outlet: Outlet;
};

export function useOutletDetail() {
  return useOutletContext<OutletDetailContext>();
}
