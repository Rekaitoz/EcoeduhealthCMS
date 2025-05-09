import { useNavigate } from 'react-router-dom';

import { ArticleForm } from '../components';

export const ArticleCreate: React.FC = () => {
  const navigate = useNavigate();

  return (
    <main>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-800">Article Data</h1>
      </div>

      <ArticleForm onCancel={() => navigate(-1)} onSuccess={() => navigate('/article')} />
    </main>
  );
};
