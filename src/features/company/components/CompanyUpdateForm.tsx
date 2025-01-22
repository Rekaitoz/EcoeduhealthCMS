import { Button, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

import { useUpdateCompany } from '../api';
import { Company, CompanyDTO } from '../types';

type Props = {
  company: Company;
  onSuccess?: VoidFunction;
};

export const CompanyUpdateForm: React.FC<Props> = ({ company, onSuccess }) => {
  const navigate = useNavigate();
  const form = useForm<CompanyDTO>({
    initialValues: {
      name: company.name,
      region: company.region,
    },
  });
  const { mutateAsync, isPending } = useUpdateCompany({
    config: {
      onError({ response }) {
        form.setErrors((response?.data as any).errors);
      },
      onSuccess() {
        if (onSuccess) {
          onSuccess();
        }
        notifications.show({
          message: 'Perusahaan berhasil diubah',
          color: 'green',
          icon: <IconCheck />,
        });
        modals.closeAll();
      },
    },
  });

  const handleSubmit = form.onSubmit(async (values) => {
    await mutateAsync({ id: company.id, data: values });
  });

  return (
    <form className="relative" onSubmit={handleSubmit}>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-6">
          <TextInput
            {...form.getInputProps('name')}
            placeholder="Masukan nama perusahaan"
            label="Nama"
            required
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <TextInput
            {...form.getInputProps('region')}
            label="Region"
            placeholder="Masukan region"
            required
          />
        </div>
      </div>

      <div className="flex items-center space-x-4 mt-6">
        <Button type="submit" loading={isPending}>
          Simpan
        </Button>
        <Button variant="default" loading={isPending} onClick={() => navigate(-1)}>
          Kembali
        </Button>
      </div>
    </form>
  );
};
