import { useOutletContext } from 'react-router-dom';

import { Company } from '..';

type CompanyDetailContext = {
  company: Company;
};

export function useCompanyDetail() {
  return useOutletContext<CompanyDetailContext>();
}
