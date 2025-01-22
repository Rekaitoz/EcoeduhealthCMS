import { Button, Select, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDebouncedValue } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import { IconCategory, IconSearch } from '@tabler/icons-react';

import { OutletCreateForm, OutletQuery, OutletTable } from '@/features/outlet';

import { useCompanyDetail } from '../hooks';

export const CompanyOutlets: React.FC = () => {
  const { company } = useCompanyDetail();
  const form = useForm<OutletQuery>({
    initialValues: {
      keyword: '',
      status: undefined,
    },
  });
  const [params] = useDebouncedValue(form.values, 200);

  function handleAddOutlet() {
    modals.open({
      title: 'Tambah Outlet',
      children: <OutletCreateForm company={company.id} />,
    });
  }

  return (
    <>
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
      </div>

      <div className="space-y-6">
        <OutletTable
          {...params}
          company={company.id}
          toolbar={
            <>
              <Button size="xs" onClick={handleAddOutlet}>
                Tambah
              </Button>
            </>
          }
        />
      </div>
    </>
  );
};
