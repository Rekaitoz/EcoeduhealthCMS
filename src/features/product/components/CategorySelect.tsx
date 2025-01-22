import { SelectProps, Select } from '@mantine/core';
import { useMemo } from 'react';

import { useCategories } from '../api';
import { Category } from '../types';

type Props = {
  onChange?: (id: number | null) => void;
  onSelected?: (category: Category | null) => void;
} & Omit<SelectProps, 'data' | 'onChange'>;

export const CategorySelect: React.FC<Props> = ({ onChange, onSelected, ...props }) => {
  const { data, isLoading } = useCategories({ params: { limit: -1 } });

  const categories = useMemo(() => {
    if (!data) return [];

    return data.result.map(({ id, name }) => ({
      label: name,
      value: id.toString(),
    }));
  }, [data]);

  return (
    <Select
      {...props}
      data={categories}
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
