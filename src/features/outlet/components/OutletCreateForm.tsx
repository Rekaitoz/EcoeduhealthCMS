import { Button, Select, TextInput, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';

import { CompanySelect } from '@/features/company';

import { useCreateOutlet } from '../api';
import { OutletDTO } from '../types';

type Props = {
  company?: number;
  onSuccess?: VoidFunction;
};

export const OutletCreateForm: React.FC<Props> = ({ company, onSuccess }) => {
  const form = useForm<OutletDTO>({
    initialValues: {
      name: '',
      address: '',
      status: undefined,
      company: company ?? undefined,
    },
  });
  const { mutateAsync, isPending } = useCreateOutlet();

  const handleSubmit = form.onSubmit(async (values) => {
    await mutateAsync(
      { data: values },
      {
        onError({ response }) {
          form.setErrors((response?.data as any).errors);
        },
        onSuccess() {
          if (onSuccess) {
            onSuccess();
          }
          notifications.show({
            message: 'Outlet berhasil dibuat',
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
        <TextInput
          {...form.getInputProps('name')}
          label="Nama"
          required
          placeholder="Masukan nama outlet"
        />
        <Textarea label="Alamat" {...form.getInputProps('address')} placeholder="Masukan alamat" />
        {!company && (
          <CompanySelect
            {...form.getInputProps('company')}
            label="Perusahaan"
            placeholder="Pilih Perusahaan"
            required
            searchable
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

      <div className="flex items-center justify-end gap-4 mt-4">
        <Button
          type="button"
          variant="default"
          onClick={() => modals.closeAll()}
          loading={isPending}
        >
          Batal
        </Button>
        <Button type="submit" loading={isPending}>
          Tambah
        </Button>
      </div>
    </form>
  );
};
