import { pdf, PDFViewer } from '@react-pdf/renderer';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { LoadingScreen } from '@/components/elements';
import { useOutlet } from '@/features/outlet';
import { dayjs } from '@/lib/dayjs';

import { usePurchasesSummary, useSalesSummary } from '../api';
import { TransactionSummaryDocs } from '../components';

export const TransactionSummary: React.FC = () => {
  const [params] = useSearchParams();
  const startDate = dayjs(params.get('startDate')).toDate();
  const endDate = dayjs(params.get('endDate')).toDate();
  const outlet = params.get('outlet') || undefined;
  const enabled = !isNaN(startDate.getTime()) && !isNaN(endDate.getTime()) && !!outlet;
  const outletQuery = useOutlet({
    id: outlet || 0,
    config: { enabled },
  });
  const salesQuery = useSalesSummary({
    params: { outlet, startDate, endDate },
    config: { enabled },
  });
  const purchasesQuery = usePurchasesSummary({
    params: { outlet, startDate, endDate },
    config: { enabled },
  });

  useEffect(() => {
    if (outletQuery.isLoading || salesQuery.isLoading || purchasesQuery.isLoading) return;
    if (outletQuery.isError || salesQuery.isError || purchasesQuery.isError) return;

    (async () => {
      const blob = await pdf(
        <TransactionSummaryDocs
          outlet={outletQuery.data}
          sales={salesQuery.data}
          purchases={purchasesQuery.data}
          startDate={startDate}
          endDate={endDate}
        />
      ).toBlob();

      if (blob) {
        const url = URL.createObjectURL(blob);

        // Create a new anchor element
        const link = document.createElement('a');

        // Set the href and download attributes for the anchor element
        link.href = url;
        link.download = `laporan abude.pdf`;

        // Append the anchor element to the body
        document.body.appendChild(link);

        // Click the link to start the download
        link.click();

        // Remove the anchor element from the body
        document.body.removeChild(link);
      }
    })();
  }, [
    endDate,
    outletQuery.data,
    outletQuery.isError,
    outletQuery.isLoading,
    purchasesQuery.data,
    purchasesQuery.isError,
    purchasesQuery.isLoading,
    salesQuery.data,
    salesQuery.isError,
    salesQuery.isLoading,
    startDate,
  ]);

  if (outletQuery.isLoading || salesQuery.isLoading || purchasesQuery.isLoading)
    return <LoadingScreen />;
  if (outletQuery.isError || salesQuery.isError || purchasesQuery.isError)
    return <div>Terjadi Kesalahan</div>;

  return (
    <main className="w-full bg-black flex items-center justify-center h-screen">
      <PDFViewer className="max-w-md w-full h-screen">
        <TransactionSummaryDocs
          outlet={outletQuery.data}
          sales={salesQuery.data}
          purchases={purchasesQuery.data}
          startDate={startDate}
          endDate={endDate}
        />
      </PDFViewer>
    </main>
  );
};
