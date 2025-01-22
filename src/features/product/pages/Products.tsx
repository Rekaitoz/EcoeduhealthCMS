import { Button, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDebouncedValue } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

import { CompanySelect } from '@/features/company';

import { ProductTable } from '../components';
import { ProductQuery } from '../types';

export const Products: React.FC = () => {
  const form = useForm<ProductQuery>({
    initialValues: {
      keyword: '',
      limit: 10,
    },
  });
  const [params] = useDebouncedValue(form.values, 300);

  return (
    <main>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-800">Data Produk</h1>
        <Button component={Link} to="/product/add">
          Tambah
        </Button>
      </div>

      <section className="mb-4">
        <div className="grid grid-cols-12 gap-4">
          <TextInput
            {...form.getInputProps('keyword')}
            leftSection={<IconSearch size={16} />}
            placeholder="Cari"
            className="col-span-6 md:col-span-3"
          />
          <CompanySelect
            {...form.getInputProps('company')}
            placeholder="Pilih Perusahaan"
            className="col-span-6 md:col-span-2"
            clearable
          />
        </div>
      </section>

      <section className="mb-8">
        <ProductTable {...params} />
      </section>
    </main>
  );
};
