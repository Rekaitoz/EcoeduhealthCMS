import { Image, Page, Text, View } from '@react-pdf/renderer';

import { Outlet } from '@/features/outlet';
import { dayjs } from '@/lib/dayjs';
import { formatCurrency } from '@/utils/format';

import { PurchasesSummary, SalesSummary } from '../..';

import { PurchaseTable } from './PurchaseTable';
import { SaleTable } from './SaleTable';
import { styles } from './styles';

type Props = {
  outlet: Outlet;
  startDate: Date;
  endDate: Date;
  sales: SalesSummary[];
  purchases: PurchasesSummary[];
};

export const OutletSection: React.FC<Props> = ({
  outlet,
  startDate,
  endDate,
  purchases,
  sales,
}) => {
  const totalSale = sales.reduce((x, y) => x + y.total, 0);
  const totalPurchase = purchases.reduce((x, y) => x + y.total, 0);

  return (
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Image
          source="/images/abude-logo.png"
          style={{ width: 75, height: 75, marginBottom: 16 }}
        />
        <Text style={{ marginBottom: '12px' }}>Laporan Pemasukan dan Pengeluaran</Text>
        <Text>
          {dayjs(startDate).format('D MMMM')} - {dayjs(endDate).format('D MMMM')}
        </Text>
      </View>

      <View style={{ width: '100%', marginBottom: 24, paddingHorizontal: 56 }}>
        <Text
          style={{
            marginBottom: 8,
            fontSize: 14,
            fontFamily: 'Times-Bold',
          }}
        >
          Rekapitulasi
        </Text>
        <View
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 6,
            fontSize: 14,
          }}
        >
          <Text>Outlet</Text>
          <Text style={{ fontFamily: 'Times-Bold' }}>{outlet.name}</Text>
        </View>
        <View
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 6,
            fontSize: 14,
          }}
        >
          <Text>Total Pemasukan</Text>
          <Text style={{ fontFamily: 'Times-Bold' }}>{formatCurrency(totalSale)}</Text>
        </View>
        <View
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 6,
            fontSize: 14,
          }}
        >
          <Text>Total Pengeluaran</Text>
          <Text style={{ fontFamily: 'Times-Bold' }}>{formatCurrency(totalPurchase)}</Text>
        </View>
        <View
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 6,
            fontSize: 14,
          }}
        >
          <Text>Total Laba Kotor</Text>
          <Text style={{ fontFamily: 'Times-Bold' }}>
            {formatCurrency(totalSale - totalPurchase)}
          </Text>
        </View>
      </View>

      <SaleTable sales={sales} />

      <PurchaseTable purchases={purchases} />
    </Page>
  );
};
