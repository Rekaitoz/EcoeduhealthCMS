import { useNavigate } from 'react-router-dom';

import { ProductForm } from '../components';

export const ProductCreate: React.FC = () => {
  const navigate = useNavigate();

  return (
    <main>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-800">Data Produk</h1>
      </div>

      <ProductForm onCancel={() => navigate(-1)} onSuccess={() => navigate('/product')} />
    </main>
  );
};
