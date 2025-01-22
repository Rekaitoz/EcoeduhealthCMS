import { Document, Page, View, StyleSheet, Image, Text } from '@react-pdf/renderer';

import { Table, TableData } from '@/components/document';
import { Outlet } from '@/features/outlet';
import { dayjs } from '@/lib/dayjs';
import { formatCurrency } from '@/utils/format';

import { PurchasesSummary, SalesSummary } from '../types';

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
    fontFamily: 'Times-Roman',
    padding: '2cm',
  },
  section: {
    marginBottom: 24,
    fontSize: 16,
  },
  header: {
    textAlign: 'center',
    fontFamily: 'Times-Bold',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
});

type Props = {
  outlet: Outlet;
  sales: SalesSummary[];
  purchases: PurchasesSummary[];
  startDate: Date;
  endDate: Date;
};

export const TransactionSummaryDocs: React.FC<Props> = ({
  outlet,
  sales,
  purchases,
  startDate,
  endDate,
}) => {
  const totalSale = sales.reduce((x, y) => x + y.total, 0);
  const totalPurchase = purchases.reduce((x, y) => x + y.total, 0);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Image
            source="/images/abude-logo.png"
            style={{ width: 75, height: 75, marginBottom: 16 }}
          />
          <Text style={{ marginBottom: '12px' }}>Laporan Penjualan dan Pembelian</Text>
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
            <Text>Total Penjualan</Text>
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
            <Text>Total Pembelian</Text>
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

        <View style={styles.section}>
          <Text style={{ fontFamily: 'Times-Bold', marginBottom: 4 }}>Rincian Penjualan</Text>
          <Table
            data={[
              [
                { value: 'Tanggal', weight: 'bold' },
                { value: 'Keterangan', weight: 'bold' },
                { value: 'Jumlah', weight: 'bold' },
                { value: 'Harga Satuan Rata-Rata', weight: 'bold' },
                { value: 'Total', weight: 'bold' },
              ],
              ...(sales.map((sale) => [
                { value: dayjs(sale.date).format('DD/MM/YYYY') },
                { value: sale.name },
                { value: sale.quantity },
                { value: formatCurrency(sale.total / sale.quantity), align: 'right' },
                { value: formatCurrency(sale.total), align: 'right' },
              ]) as TableData[][]),
              [
                { value: 'Total Penjualan', span: 2, weight: 'bold' },
                { value: sales.reduce((x, y) => x + y.quantity, 0) },
                {
                  value: formatCurrency(
                    sales.reduce((x, y) => x + y.total / y.quantity, 0) / sales.length || 0
                  ),
                  align: 'right',
                },
                { value: formatCurrency(sales.reduce((x, y) => x + y.total, 0)), align: 'right' },
              ],
            ]}
            sizes={[0.15, 0.25, 0.15, 0.2, 0.25]}
          />
        </View>

        <View style={styles.section}>
          <Text style={{ fontFamily: 'Times-Bold', marginBottom: 4 }}>Rincian Pembelian</Text>
          <Table
            data={[
              [
                { value: 'Tanggal', weight: 'bold' },
                { value: 'Keterangan', weight: 'bold' },
                { value: 'Jumlah', weight: 'bold' },
                { value: 'Harga Satuan Rata-Rata', weight: 'bold' },
                { value: 'Total', weight: 'bold' },
              ],
              ...(purchases.map((sale) => [
                { value: dayjs(sale.date).format('DD/MM/YYYY') },
                { value: sale.name },
                { value: sale.quantity },
                { value: formatCurrency(sale.total / sale.quantity), align: 'right' },
                { value: formatCurrency(sale.total), align: 'right' },
              ]) as TableData[][]),
              [
                { value: 'Total Pembelian', span: 2, weight: 'bold' },
                { value: purchases.reduce((x, y) => x + y.quantity, 0) },
                {
                  value: formatCurrency(
                    purchases.reduce((x, y) => x + y.total / y.quantity, 0) / purchases.length || 0
                  ),
                  align: 'right',
                },
                {
                  value: formatCurrency(purchases.reduce((x, y) => x + y.total, 0)),
                  align: 'right',
                },
              ],
            ]}
            sizes={[0.15, 0.25, 0.15, 0.2, 0.25]}
          />
        </View>
      </Page>
    </Document>
  );
};
