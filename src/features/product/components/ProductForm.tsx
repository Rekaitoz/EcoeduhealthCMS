import {
  ActionIcon,
  Button,
  Card,
  Divider,
  NumberInput,
  Select,
  TextInput,
  Textarea,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconPlus, IconTrash } from '@tabler/icons-react';

import { CompanySelect } from '@/features/company';

import { useCreateProduct, useUpdateProduct } from '../api';
import { Product, ProductDTO } from '../types';

import { CategorySelect } from './CategorySelect';
import { ProductSelect } from './ProductSelect';

type Props = {
  product?: Product;
  company?: number;
  onSuccess?: (result: Product) => void;
  onCancel?: () => void;
};

export const ProductForm: React.FC<Props> = ({ product, company, onCancel, onSuccess }) => {
  const createMutation = useCreateProduct();
  const updateMutation = useUpdateProduct();
  const form = useForm<ProductDTO>({
    initialValues: {
      name: product?.name || '',
      description: product?.description,
      isDefault: product?.isDefault,
      price: product?.price,
      type: product?.type,
      unit: product?.unit,
      category: product?.category?.id,
      company: product?.company?.id || company,
      ingredients: product?.ingredients.map(({ ingredient, quantity }) => ({
        product: ingredient.id,
        quantity,
      })),
    },
  });

  const handleSubmit = form.onSubmit(async (values) => {
    if (!product) {
      await createMutation.mutateAsync(
        { data: values },
        {
          onError({ response }) {
            form.setErrors((response?.data as any).errors);
          },
          onSuccess({ result }) {
            notifications.show({
              message: 'Produk berhasil dibuat',
              color: 'green',
              icon: <IconCheck />,
            });
            if (onSuccess) {
              onSuccess(result);
            }
          },
        }
      );
    } else {
      await updateMutation.mutateAsync(
        { id: product.id, data: values },
        {
          onError({ response }) {
            form.setErrors((response?.data as any).errors);
          },
          onSuccess({ result }) {
            notifications.show({
              message: 'Produk berhasil diubah',
              color: 'green',
              icon: <IconCheck />,
            });
            if (onSuccess) {
              onSuccess(result);
            }
          },
        }
      );
    }
  });

  return (
    <Card shadow="sm" component="form" onSubmit={handleSubmit}>
      <Card.Section withBorder>
        <div className="flex items-center justify-between py-4 px-5">
          <div className="font-semibold text-base">
            <h2 className="text-gray-800">{!product ? 'Tambah' : 'Edit'} Data Produk</h2>
          </div>
        </div>
      </Card.Section>

      <Card.Section p="md" withBorder>
        <div className="space-y-4">
          <div className="grid grid-cols-12 gap-4">
            <CompanySelect
              {...form.getInputProps('company')}
              label="Perusahaan"
              placeholder="Pilih Perusahaan"
              className="col-span-12 lg:col-span-4"
              required
            />
          </div>
          <div className="grid grid-cols-12 gap-4">
            <TextInput
              {...form.getInputProps('name')}
              label="Nama"
              placeholder="Masukan Nama Produk"
              className="col-span-12 lg:col-span-6"
              required
            />
            <Select
              {...form.getInputProps('type')}
              label="Jenis"
              placeholder="Pilih Jenis"
              className="col-span-12 lg:col-span-3"
              data={[
                { label: 'Penjualan', value: 'sale' },
                { label: 'Pembelian', value: 'purchase' },
              ]}
              required
            />
            <CategorySelect
              {...form.getInputProps('category')}
              label="Kategori"
              placeholder="Pilih Kategori"
              className="col-span-12 lg:col-span-3"
              clearable
            />
            <NumberInput
              {...form.getInputProps('price')}
              label="Harga"
              placeholder="Masukan Harga"
              className="col-span-12 lg:col-span-4"
              leftSection={<span className="text-xs">Rp</span>}
              thousandSeparator="."
              decimalSeparator=","
              required
            />
            <TextInput
              {...form.getInputProps('unit')}
              label="Satuan"
              placeholder="Masukan Satuan atau Unit"
              className="col-span-12 lg:col-span-4"
              required
            />
            <Textarea
              {...form.getInputProps('description')}
              label="Deskripsi"
              placeholder="Masukan Deskripsi"
              className="col-span-12"
            />
          </div>
          <Divider />
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="">
                <h4 className="text-base font-bold">Bahan Dasar</h4>
                <p className="text-sm text-gray-600">
                  Tambahkan produk yang berpengaruh terhadap stok.
                </p>
              </div>

              <div className="flex-shrink-0">
                <Button
                  size="xs"
                  variant="light"
                  leftSection={<IconPlus size={14} />}
                  onClick={() =>
                    form.insertListItem('ingredients', {
                      product: undefined,
                      quantity: undefined,
                    })
                  }
                >
                  Tambah
                </Button>
              </div>
            </div>
            <div className="w-full">
              {form.values.ingredients && form.values.ingredients.length > 0 && (
                <div className="flex">
                  <div className="grid grid-cols-12 gap-4 text-sm mb-0.5 flex-grow pr-11">
                    <div className="col-span-6">Produk</div>
                    <div className="col-span-6">Kuantitas</div>
                  </div>
                </div>
              )}
              {form.values.ingredients?.map((_, index) => (
                <div
                  key={`ingredient_${index}`}
                  className="flex items-center space-x-4 mb-2 last:mb-0"
                >
                  <div className="grid grid-cols-12 gap-4 flex-grow">
                    <ProductSelect
                      {...form.getInputProps(`ingredients.${index}.product`)}
                      placeholder={!form.values.company ? 'Pilih Perusahaan Dulu' : 'Pilih Produk'}
                      disabled={!form.values.company}
                      className="col-span-6"
                      withUnit
                      params={{
                        type: 'purchase',
                        company: form.values.company,
                      }}
                    />
                    <NumberInput
                      {...form.getInputProps(`ingredients.${index}.quantity`)}
                      placeholder="Masukan Kuantitas"
                      className="col-span-6"
                      allowDecimal
                      step={0.1}
                      decimalScale={3}
                      thousandSeparator="."
                      decimalSeparator=","
                    />
                  </div>
                  <ActionIcon
                    variant="subtle"
                    color="red"
                    radius="lg"
                    onClick={() => form.removeListItem('ingredients', index)}
                  >
                    <IconTrash size={18} />
                  </ActionIcon>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card.Section>

      <Card.Section p="md" pt={0} withBorder>
        <div className="flex flex-row-reverse items-center justify-end gap-2 mt-4">
          <Button
            type="button"
            variant="default"
            onClick={() => {
              if (onCancel) onCancel();
            }}
            loading={createMutation.isPending || updateMutation.isPending}
          >
            Batal
          </Button>
          <Button type="submit" loading={createMutation.isPending || updateMutation.isPending}>
            Simpan
          </Button>
        </div>
      </Card.Section>
    </Card>
  );
};
