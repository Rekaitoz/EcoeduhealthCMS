import { ActionIcon, Button, Card, Divider, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconEdit, IconNotes, IconPlus, IconTrash } from '@tabler/icons-react';

import { useDeleteQuestions } from '../api';
import { Questions, Quiz } from '../types';

import { QuestionForm } from './QuestionForm';
import { SubmissionDetail } from './SubmissionDetail';

type Props = {
  quiz?: Quiz;
  onSuccess?: (result: Questions) => void;
  onCancel?: () => void;
};

export const QuizDetailForm: React.FC<Props> = ({ quiz, onCancel }) => {
  const deleteMutation = useDeleteQuestions();

  function handleAdd() {
    modals.open({
      title: 'Tambah Pertanyaan',
      children: <QuestionForm quiz={quiz} />,
      size: 'xl',
    });
  }

  function handleUpdate(questions: Questions | undefined) {
    modals.open({
      title: 'Update Pertanyaan',
      children: <QuestionForm quiz={quiz} questions={questions} />,
      size: 'xl',
    });
  }

  function handleDetail() {
    modals.open({
      title: 'Detail Submission',
      children: <SubmissionDetail quiz={quiz} />,
      size: '100%',
    });
  }

  function handleRemove(id: number) {
    return () => {
      modals.openConfirmModal({
        modalId: 'questions-delete',
        title: 'Hapus Pertanyaan',
        children: <Text size="sm">Apakah anda yakin untuk menghapus Pertanyaan ini?</Text>,
        centered: true,
        closeOnConfirm: false,
        onConfirm: async () => {
          await deleteMutation.mutateAsync(
            { id },
            {
              onSuccess: () => {
                notifications.show({
                  message: 'Pertanyaan berhasil dihapus',
                  color: 'green',
                  icon: <IconCheck />,
                });
                modals.close('questions-delete');
              },
              onError: () => {
                notifications.show({
                  message: 'Pertanyaan tidak bisa dihapus',
                  color: 'red',
                });
                modals.close('questions-delete');
              },
            }
          );
        },
      });
    };
  }

  return (
    <Card shadow="sm" component="form">
      <Card.Section withBorder>
        <div className="flex items-center justify-between py-3 px-5 ">
          <div className="text-base w-full">
            <h2 className="text-gray-800 pt-2 font-semibold">Detail Pertanyaan Kuesioner</h2>
          </div>
        </div>
      </Card.Section>

      <Card.Section p="md" withBorder className="">
        <div className="space-y-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">{quiz?.name}</h1>
            <h1 className="text-sm">{quiz?.description}</h1>
          </div>
          <div className="flex flex-col items-start gap-2">
            <Button
              size="xs"
              variant="gradient"
              leftSection={<IconPlus size={14} />}
              onClick={handleAdd}
            >
              Tambah Pertanyaan
            </Button>
            <Button
              size="xs"
              variant="light"
              leftSection={<IconNotes size={14} />}
              onClick={handleDetail}
            >
              Hasil Submission
            </Button>
          </div>

          <Divider />
          <div>
            {quiz?.questions && quiz?.questions.length > 0 ? (
              quiz?.questions?.map((item, index) => (
                <div key={`questions_${index}`} className="py-2">
                  <div className="flex flex-col  items-start gap-y-2 mb-2 pb-4">
                    <div className="w-full pb-2 ">
                      <h4 className="text-base font-bold pb-1 gap-x-1 flex items-center">
                        <span>Pertanyaan {index + 1} </span>
                        <div>
                          <ActionIcon
                            title="Update Pertanyaan"
                            onClick={() => handleUpdate(item)}
                            color="blue"
                            variant="subtle"
                            radius="lg"
                          >
                            <IconEdit size={18} />
                          </ActionIcon>
                          <ActionIcon
                            title="Hapus Pertanyaan"
                            variant="subtle"
                            color="red"
                            radius="lg"
                            onClick={handleRemove(item.id)}
                          >
                            <IconTrash size={18} />
                          </ActionIcon>
                        </div>
                      </h4>
                      <span className="font-semibold">{quiz?.questions?.[index].text}</span>
                    </div>
                    {quiz?.questions?.[index].answers &&
                    quiz?.questions?.[index].answers.length > 0 ? (
                      quiz?.questions?.[index]?.answers?.map((item2, index2) => (
                        <div
                          key={`answer_${index2}`}
                          className="flex w-full items-center space-x-4 mb-1 last:mb-0"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-1  gap-3 flex-grow w-full ">
                            &#8226; {item2.text}
                            <div className="flex items-center space-x-2 col-span-6">
                              <span className="font-medium text-sm text-gray-800 ">
                                Nilai Jawaban = {item2.value} Poin
                              </span>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="flex justify-center w-full text-gray-700">
                        Belum Ada Jawaban yang Ditambahkan
                      </div>
                    )}
                  </div>
                  <Divider />
                </div>
              ))
            ) : (
              <div className="flex justify-center w-full text-gray-700">
                Belum Ada Pertanyaan yang Dibuat
              </div>
            )}
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
          >
            Kembali
          </Button>
        </div>
      </Card.Section>
    </Card>
  );
};
