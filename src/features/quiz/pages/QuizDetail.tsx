import { Button } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import { useNavigate, useParams } from 'react-router-dom';

import { LoadingScreen } from '@/components/elements';

import { useQuizById } from '../api';
import { QuizDetailForm } from '../components/QuizDetailForm';

export const QuizDetail: React.FC = () => {
  const { id } = useParams();
  const { data: dataQuiz, isLoading, isError } = useQuizById({ id: id as string });

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
        <h1 className="text-lg font-bold mb-2">Kuesioner tidak ditemukan</h1>
        <Button onClick={() => navigate(-1)} leftSection={<IconArrowLeft size={14} />}>
          Kembali
        </Button>
      </div>
    );

  return (
    <main>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-800">Data Kuesioner</h1>
      </div>

      <QuizDetailForm
        quiz={dataQuiz}
        onCancel={() => navigate(-1)}
        onSuccess={() => navigate('/product')}
      />
    </main>
  );
};
