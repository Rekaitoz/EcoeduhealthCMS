import { Button, Select, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDebouncedValue } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import { IconCategory, IconSearch } from '@tabler/icons-react';

import { CompanySelect } from '@/features/company';

import { OutletCreateForm, OutletTable } from '../components';
import { OutletQuery } from '../types';

export const Outlets: React.FC = () => {
  const form = useForm<OutletQuery>({
    initialValues: {
      keyword: '',
      status: undefined,
      company: undefined,
    },
  });
  const [params] = useDebouncedValue(form.values, 200);

  function handleAdd() {
    modals.open({
      title: 'Tambah Outlet',
      children: <OutletCreateForm />,
    });
  }

  return (
    <main>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Outlet</h1>
        <Button onClick={handleAdd}>Tambah</Button>
      </div>

      <div className="grid grid-cols-12 gap-4 mb-4">
        <div className="col-span-6 sm:col-span-6 md:col-span-4 lg:col-span-3">
          <TextInput
            {...form.getInputProps('keyword')}
            type="search"
            placeholder="Search"
            leftSection={<IconSearch size={14} />}
          />
        </div>

        <div className="col-span-6 sm:col-span-6 md:col-span-3 lg:col-span-2">
          <Select
            {...form.getInputProps('status')}
            placeholder="Status"
            leftSection={<IconCategory size={14} />}
            value={
              form.values['status'] == undefined ? null : form.values['status'] ? 'true' : 'false'
            }
            onChange={(v) => form.setFieldValue('status', v == null ? undefined : v == 'true')}
            data={[
              { label: 'Aktif', value: 'true' },
              { label: 'Nonaktif', value: 'false' },
            ]}
            clearable
          />
        </div>
        <div className="col-span-6 sm:col-span-6 md:col-span-3 lg:col-span-2">
          <CompanySelect {...form.getInputProps('company')} placeholder="Perusahaan" clearable />
        </div>
      </div>

      <section className="mb-8">
        <OutletTable {...params} />
      </section>
    </main>
  );
};
