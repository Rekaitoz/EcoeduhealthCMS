import { Button } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

export const NotFoundState: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-48 text-center">
      <h1 className="text-lg font-bold mb-6">Halaman tidak ditemukan</h1>
      <Button onClick={() => navigate(-1)} leftSection={<IconArrowLeft size={14} />}>
        Kembali
      </Button>
    </div>
  );
};
