import { ActionIcon, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconEdit, IconTrash } from '@tabler/icons-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Table } from '@/components/elements';
import { formatCurrency } from '@/utils/format';

import { useDeleteProduct, useProducts } from '../api';
import { ProductQuery } from '../types';

const initialParams: ProductQuery = {
  limit: 5,
  page: 1,
};

type Props = {
  toolbar?: React.ReactNode;
} & ProductQuery;

export const ProductTable: React.FC<Props> = ({ toolbar, ...props }) => {
  const [params, setParams] = useState(initialParams);
  const { data, isLoading } = useProducts({ params: { ...params, ...props } });
  const deleteMutation = useDeleteProduct();

  function handlePage(page: number) {
    setParams({ ...params, page });
  }

  function handleRemove(id: number) {
    return () => {
      modals.openConfirmModal({
        modalId: 'product-delete',
        title: 'Hapus Produk',
        children: <Text size="sm">Apakah anda yakin untuk menghapus produk ini?</Text>,
        centered: true,
        closeOnConfirm: false,
        onConfirm: async () => {
          await deleteMutation.mutateAsync(
            { id },
            {
              onSuccess: () => {
                notifications.show({
                  message: 'Produk berhasil dihapus',
                  color: 'green',
                  icon: <IconCheck />,
                });
                modals.close('product-delete');
              },
              onError: () => {
                notifications.show({
                  message: 'Produk tidak bisa dihapus',
                  color: 'red',
                });
                modals.close('product-delete');
              },
            }
          );
        },
      });
    };
  }

  return (
    <Table
      title="Tabel Data Produk"
      toolbar={toolbar}
      loading={isLoading}
      header={['Nama', 'Deskripsi', 'Harga', 'Jenis', 'Perusahaan', '']}
      items={data?.result}
      onPageChange={handlePage}
      metadata={data?.metadata}
      renderItem={(product) => (
        <tr key={product.id}>
          <td>
            <div className="text-xs text-gray-600">{product.category?.name}</div>
            <div>{product.name}</div>
          </td>
          <td>{product.description || '-'}</td>
          <td>{formatCurrency(product.price)}</td>
          <td>{product.type == 'sale' ? 'Penjualan' : 'Pembelian'}</td>
          <td>{product.company?.name ?? '-'}</td>
          <td>
            <div className="flex items-center space-x-2">
              <ActionIcon
                title="Hapus Produk"
                onClick={handleRemove(product.id)}
                variant="subtle"
                color="red"
                radius="lg"
              >
                <IconTrash size={18} />
              </ActionIcon>
              <ActionIcon
                title="Update Produk"
                variant="subtle"
                color="blue"
                radius="lg"
                component={Link}
                to={`/product/${product.id}`}
              >
                <IconEdit size={18} />
              </ActionIcon>
            </div>
          </td>
        </tr>
      )}
    />
  );
};
