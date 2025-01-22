import { Button, Select, TextInput, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

import { CompanySelect } from '@/features/company';

import { useUpdateOutlet } from '../api';
import { Outlet, OutletDTO } from '../types';

type Props = {
  outlet: Outlet;
  company?: number;
  onSuccess?: VoidFunction;
};

export const OutletUpdateForm: React.FC<Props> = ({ outlet, company, onSuccess }) => {
  const navigate = useNavigate();
  const form = useForm<OutletDTO>({
    initialValues: {
      name: outlet.name,
      address: outlet.address,
      status: outlet.status,
      company: outlet.company.id,
    },
  });
  const { mutateAsync, isPending } = useUpdateOutlet();

  const handleSubmit = form.onSubmit(async (values) => {
    await mutateAsync(
      { id: outlet.id, data: values },
      {
        onError({ response }) {
          form.setErrors((response?.data as any).errors);
        },
        onSuccess() {
          if (onSuccess) {
            onSuccess();
          }
          notifications.show({
            message: 'Outlet berhasil diubah',
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
          <CompanySelect
            {...form.getInputProps('company')}
            label="Perusahaan"
            placeholder="Pilih Perusahaan"
            required
            clearable
          />
        )}
        <Select
          {...form.getInputProps('status')}
          label="Status"
          placeholder="Pilih Status"
          required
          data={[
            { label: 'Aktif', value: 'true' },
            { label: 'Nonaktif', value: 'false' },
          ]}
          value={
            form.values['status'] == undefined ? null : form.values['status'] ? 'true' : 'false'
          }
          onChange={(v) => form.setFieldValue('status', v == null ? undefined : v == 'true')}
        />
      </div>

      <div className="flex items-center space-x-4 mt-4">
        <Button type="submit" loading={isPending}>
          Simpan
        </Button>
        <Button type="button" variant="default" loading={isPending} onClick={() => navigate(-1)}>
          Kembali
        </Button>
      </div>
    </form>
  );
};
