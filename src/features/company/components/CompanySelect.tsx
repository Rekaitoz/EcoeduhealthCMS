import { SelectProps, Select } from '@mantine/core';
import { useMemo } from 'react';

import { useCompanies } from '../api';
import { Company } from '../types';

type Props = {
  onChange?: (id: number | null) => void;
  onSelected?: (company: Company | null) => void;
} & Omit<SelectProps, 'data' | 'onChange'>;

export const CompanySelect: React.FC<Props> = ({ onChange, onSelected, ...props }) => {
  const { data, isLoading } = useCompanies({ params: { limit: -1 } });

  const companies = useMemo(() => {
    if (!data) return [];

    return data.result.map(({ id, name }) => ({
      label: name,
      value: id.toString(),
    }));
  }, [data]);

  return (
    <Select
      {...props}
      value={props.value?.toString()}
      data={companies}
      disabled={isLoading}
      onChange={(v) => {
        if (onChange) onChange(v ? parseInt(v) : null);

        if (onSelected && v) {
          onSelected(data?.result.filter(({ id }) => id == parseInt(v!)).at(0) || null);
        }
      }}
    />
  );
};
