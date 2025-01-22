import { PDFViewer, pdf } from '@react-pdf/renderer';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import { LoadingScreen } from '@/components/elements';
import { getOutlet } from '@/features/outlet';
import { dayjs } from '@/lib/dayjs';

import { getPurchasesSummary, getSalesSummary } from '../api';
import { OutletDocument, OutletDocumentProps } from '../components';

export const OutletSummary: React.FC = () => {
  const [params] = useSearchParams();
  const startDate = dayjs(params.get('startDate') || new Date()).toDate();
  const endDate = dayjs(params.get('endDate') || new Date()).toDate();
  const { id } = useParams<'id'>();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['outlet-summary'],
    queryFn: () => getSummaryData({ id: id as string, startDate, endDate }),
  });

  useEffect(() => {
    if (!data) return;

    (async () => {
      const blob = await pdf(<OutletDocument {...data} />).toBlob();

      if (blob) {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');

        link.href = url;
        link.download = `laporan abude.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    })();
  }, [data]);

  if (isLoading) return <LoadingScreen />;
  if (isError) return <div>Terjadi Kesalahan</div>;

  return (
    <main className="w-full bg-black flex items-center justify-center h-screen">
      <PDFViewer className="max-w-md w-full h-screen">
        <OutletDocument {...data} />
      </PDFViewer>
    </main>
  );
};

type SummaryParams = {
  id: number | string;
  startDate: Date;
  endDate: Date;
};

async function getSummaryData({ id, startDate, endDate }: SummaryParams) {
  const outlet = await getOutlet({ id });
  const sales = await getSalesSummary({
    params: {
      outlet: id,
      startDate: dayjs(startDate).utc(true).startOf('d').toDate(),
      endDate: dayjs(endDate).utc(true).endOf('d').toDate(),
      status: ['accepted', 'approved'],
    },
  });
  const purchases = await getPurchasesSummary({
    params: {
      outlet: id,
      startDate: dayjs(startDate).utc(true).startOf('d').toDate(),
      endDate: dayjs(endDate).utc(true).endOf('d').toDate(),
      status: ['accepted', 'approved'],
    },
  });

  return {
    outlet,
    startDate,
    endDate,
    sales,
    purchases,
  } as OutletDocumentProps;
}
