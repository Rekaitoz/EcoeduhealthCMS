import { SelectProps, Select } from '@mantine/core';
import { useMemo } from 'react';

import { useProducts } from '../api';
import { Product, ProductQuery } from '../types';

type Props = {
  onChange?: (id: number | null) => void;
  onSelected?: (product: Product | null) => void;
  withUnit?: boolean;
  params?: ProductQuery;
} & Omit<SelectProps, 'data' | 'onChange'>;

export const ProductSelect: React.FC<Props> = ({
  onChange,
  onSelected,
  withUnit,
  params,
  ...props
}) => {
  const { data, isLoading } = useProducts({ params: { limit: -1, ...params } });

  const products = useMemo(() => {
    if (!data) return [];

    return data.result.map((item) => {
      const desc = [withUnit && item.unit].filter((v) => typeof v == 'string');

      return {
        label: `${item.name}${desc.length > 0 ? ` (${desc.join(', ')})` : ''}`,
        value: item.id.toString(),
      };
    });
  }, [data, withUnit]);

  return (
    <Select
      {...props}
      value={props.value?.toString()}
      data={products}
      disabled={isLoading || props.disabled}
      onChange={(v) => {
        if (onChange) onChange(v ? parseInt(v) : null);

        if (onSelected && v) {
          onSelected(data?.result.filter(({ id }) => id == parseInt(v!)).at(0) || null);
        }
      }}
    />
  );
};
