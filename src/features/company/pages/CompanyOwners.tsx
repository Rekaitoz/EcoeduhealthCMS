import { OwnerTable } from '..';
import { useCompanyDetail } from '../hooks';

export const CompanyOwners: React.FC = () => {
  const { company } = useCompanyDetail();

  return (
    <div className="space-y-6">
      <OwnerTable company={company.id} />
    </div>
  );
};
