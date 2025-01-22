import { AdminTable } from '..';
import { useOutletDetail } from '../hooks';

export const OutletAdmins: React.FC = () => {
  const { outlet } = useOutletDetail();

  return (
    <div className="space-y-6">
      <AdminTable outlet={outlet.id} />
    </div>
  );
};
