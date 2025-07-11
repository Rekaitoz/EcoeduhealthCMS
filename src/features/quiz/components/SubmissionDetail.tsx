import { Accordion, Button, Divider, Group, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { modals } from '@mantine/modals';
import { IconSearch } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

import { LoadingScreen } from '@/components/elements';
import { Pagination } from '@/components/navigation';

import { useSubmission } from '../api';
import { Questions, Quiz, SubmissionFilter, SubmissionGetAll } from '../types';

type Props = {
  onSuccess?: (result: Questions) => void;
  quiz?: Quiz;
  questions?: Questions;
};

function AccordionLabel(item: SubmissionFilter) {
  return (
    <Group wrap="nowrap">
      <div>
        <Text>{item.name}</Text>
        <Text size="sm" c="dimmed" fw={400}>
          Total Skor = {item.submission.reduce((acc, subItem) => acc + subItem.answer.value, 0)}
        </Text>
      </div>
    </Group>
  );
}

export const SubmissionDetail: React.FC<Props> = ({ quiz }) => {
  const { data: dataSubmission, isLoading } = useSubmission({
    params: { limit: 1000000, page: 1 },
  });

  const [data, setData] = useState<SubmissionGetAll>();

  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 5; // Number of items per page
  const form = useForm({
    initialValues: {
      keyword: '',
    },
  });

  useEffect(() => {
    if (dataSubmission) {
      setData(dataSubmission);
    }
  }, [quiz, dataSubmission]);
  console.log(data);
  const filteredSubmissions = data?.result.filter((item) => item.quiz?.id === quiz?.id) || [];

  const groupedByUser = filteredSubmissions?.reduce<SubmissionFilter[]>((acc, item) => {
    const userId = item.user?.id;

    if (userId === undefined) return acc; // Skip items without a valid user ID

    // Jika user belum ada di accumulator, tambahkan user baru
    if (!acc[userId]) {
      acc[userId] = {
        id: userId,
        name: item.user.name,
        submission: [],
      };
    }

    // Tambahkan submission ke user yang sesuai
    acc[userId].submission.push({
      id: item.id,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      question: {
        id: item.question.id,
        text: item.question.text,
      },
      answer: {
        id: item.answer.id,
        text: item.answer.text,
        value: item.answer.value,
      },
    });

    return acc;
  }, []);

  const searchedData = groupedByUser.filter((user) =>
    user.name.toLowerCase().includes(form.values.keyword.toLowerCase())
  );

  const paginatedData = searchedData.slice(
    (currentPage - 1) * resultsPerPage,
    currentPage * resultsPerPage
  );

  const items = paginatedData.map((item) => (
    <Accordion.Item value={item.name} key={item.id}>
      <Accordion.Control>
        <AccordionLabel {...item} />
      </Accordion.Control>
      <Accordion.Panel>
        {item.submission.map((item2, index) => (
          <div key={`questions_${index}`} className="py-2">
            <div className="flex flex-col items-start gap-y-2 mb-2 pb-4">
              <div className="w-full pb-2">
                <h4 className="text-base font-bold pb-1 gap-x-1 flex items-center">
                  <span>Pertanyaan {index + 1} </span>
                </h4>
                <span className="font-semibold">{item2.question.text}</span>
              </div>
              <div className="flex w-full items-center space-x-4 mb-1 last:mb-0">
                <div className="grid grid-cols-1 gap-3 flex-grow w-full">
                  &#8226; {item2.answer.text}
                  <div className="flex items-center space-x-2 col-span-6">
                    <span
                      className={`font-medium text-sm ${item2.answer.value > 0 ? 'text-green-800' : 'text-red-800'}`}
                    >
                      Nilai Jawaban = {item2.answer.value} Poin
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <Divider />
          </div>
        ))}
      </Accordion.Panel>
    </Accordion.Item>
  ));

  if (isLoading)
    return (
      <div className="mb-5">
        <LoadingScreen />
      </div>
    );

  return (
    <section className="relative">
      <div className="space-y-2">
        <div className="grid grid-cols-12 gap-4 mb-4">
          <div className="col-span-6 sm:col-span-6 md:col-span-4 lg:col-span-3">
            <TextInput
              type="search"
              placeholder="Search"
              leftSection={<IconSearch size={14} />}
              {...form.getInputProps('keyword')}
            />
          </div>
        </div>
        {dataSubmission?.result && dataSubmission?.result.length > 0 ? (
          <Accordion chevronPosition="right" variant="contained">
            {items}
          </Accordion>
        ) : (
          <div className="flex justify-center w-full text-gray-700 py-5">
            Belum Ada Jawaban yang Ditambahkan
          </div>
        )}
      </div>
      <Pagination
        metadata={{
          total: searchedData.length,
          limit: resultsPerPage,
          page: currentPage,
          count: paginatedData.length,
        }}
        onPageChange={(page) => setCurrentPage(page)}
      />

      <div className="flex items-center justify-end gap-4 mt-4">
        <Button type="button" variant="default" onClick={() => modals.closeAll()}>
          Kembali
        </Button>
      </div>
    </section>
  );
};
