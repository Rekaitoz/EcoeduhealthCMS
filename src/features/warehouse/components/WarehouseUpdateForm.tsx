import { Button, Select, TextInput, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

import { useCompanies } from '@/features/company';

import { useUpdateWarehouse } from '../api';
import { Warehouse, WarehouseRequest } from '../types';

type Props = {
  warehouse: Warehouse;
  company?: number;
  onSuccess?: VoidFunction;
};

export const WarehouseUpdateForm: React.FC<Props> = ({ warehouse, company, onSuccess }) => {
  const navigate = useNavigate();
  const form = useForm<WarehouseRequest>({
    initialValues: {
      name: warehouse.name,
      address: warehouse.address,
      latitude: warehouse.latitude,
      longitude: warehouse.longitude,
      status: 'active',
      company: company ?? warehouse.company.id,
    },
  });
  const { mutateAsync, isLoading } = useUpdateWarehouse();
  const { data } = useCompanies({ params: { limit: -1 }, config: { enabled: !company } });

  const handleSubmit = form.onSubmit(async (values) => {
    await mutateAsync(
      { id: warehouse.id, data: values },
      {
        onError({ response }) {
          form.setErrors((response?.data as any).errors);
        },
        onSuccess() {
          if (onSuccess) {
            onSuccess();
          }
          notifications.show({
            message: 'Gudang berhasil dibuat',
            color: 'green',
            icon: <IconCheck />,
          });
          modals.closeAll();
        },
      }
    );
  });

  return (
    <form className="relative" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <TextInput label="Nama" required {...form.getInputProps('name')} />
        <Textarea label="Alamat" {...form.getInputProps('address')} />
        {!company && (
          <Select
            {...form.getInputProps('company')}
            label="Perusahaan"
            required
            value={form.values['company'] == 0 ? '' : form.values['company'].toString()}
            onChange={(v) => form.setFieldValue('company', parseInt(v || '0'))}
            searchable
            withinPortal
            data={[
              { label: 'Pilih Perusahaan', value: '' },
              ...(data?.result ?? []).map(({ id, name }) => ({
                value: id.toString(),
                label: name,
              })),
            ]}
          />
        )}
        <Select
          label="Status"
          required
          data={[
            { label: 'Active', value: 'active' },
            { label: 'Inactive', value: 'inactive' },
          ]}
          {...form.getInputProps('status')}
        />
      </div>

      <div className="flex items-center space-x-4 mt-4">
        <Button type="submit" loading={isLoading}>
          Simpan
        </Button>
        <Button type="button" variant="default" loading={isLoading} onClick={() => navigate(-1)}>
          Kembali
        </Button>
      </div>
    </form>
  );
};
