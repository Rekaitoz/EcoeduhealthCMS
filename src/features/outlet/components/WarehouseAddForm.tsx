import { Button, Select } from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';
import { useMemo, useState } from 'react';

import { useWarehouses } from '@/features/warehouse';

import { useAddWarehouse, useOutletWarehouses } from '..';

type Props = {
  outlet: number;
  onSuccess?: () => void;
};

export const WarehouseAddForm: React.FC<Props> = ({ outlet, onSuccess }) => {
  const [selected, setSelected] = useState<number | null>(null);
  const { mutateAsync, isLoading } = useAddWarehouse();
  const { data: warehouses } = useOutletWarehouses({ id: outlet });
  const { data } = useWarehouses({ params: { limit: -1 } });

  const selectData = useMemo(() => {
    const warehouseIds = (warehouses?.result ?? []).map(({ id }) => id);

    return (data?.result ?? [])
      .filter(({ id }) => !warehouseIds.includes(id))
      .map((warehouse) => ({
        label: `${warehouse.name}`,
        value: warehouse.id.toString(),
      }));
  }, [warehouses, data]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (selected == null) {
      return notifications.show({ message: 'Pegawai tidak boleh kosong', color: 'red' });
    }

    await mutateAsync(
      { outletId: outlet, warehouseId: selected },
      {
        onSuccess: () => {
          if (onSuccess) {
            onSuccess();
          }
          notifications.show({
            message: 'Gudang berhasil ditambahkan',
            color: 'green',
            icon: <IconCheck />,
          });
          modals.closeAll();
        },
        onError: () => {
          notifications.show({
            message: 'Gudang gagal ditambahkan',
            color: 'red',
          });
        },
      }
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-2">
        <Select
          label="Gudang"
          placeholder="Pilih Gudang"
          value={selected != null ? selected.toString() : ''}
          onChange={(v) => setSelected(v ? parseInt(v) : null)}
          data={selectData}
          searchable
          withinPortal
          nothingFound="Tidak ada gudang"
          dropdownPosition="bottom"
        />
      </div>
      <div className="flex items-center justify-end gap-4 mt-4">
        <Button
          type="button"
          variant="default"
          onClick={() => modals.closeAll()}
          loading={isLoading}
        >
          Batal
        </Button>
        <Button type="submit" loading={isLoading}>
          Tambah
        </Button>
      </div>
    </form>
  );
};
