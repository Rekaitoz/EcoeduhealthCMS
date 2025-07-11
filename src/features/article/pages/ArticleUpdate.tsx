import { Button } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import { useNavigate, useParams } from 'react-router-dom';

import { LoadingScreen } from '@/components/elements';

import { useArticle } from '../api';
import { ArticleForm } from '../components';

export const ArticleUpdate: React.FC = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useArticle({ id: Number(id) });

  const navigate = useNavigate();

  if (isLoading)
    return (
      <div className="mt-48">
        <LoadingScreen />
      </div>
    );

  if (isError)
    return (
      <div className="mt-48 text-center">
        <h1 className="text-lg font-bold mb-2">Article Not Found</h1>
        <Button onClick={() => navigate(-1)} leftSection={<IconArrowLeft size={14} />}>
          Kembali
        </Button>
      </div>
    );

  return (
    <main>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-800">Article Data</h1>
      </div>

      <ArticleForm
        article={data.data ?? ''}
        onCancel={() => navigate(-1)}
        onSuccess={() => navigate('/article')}
      />
    </main>
  );
};
