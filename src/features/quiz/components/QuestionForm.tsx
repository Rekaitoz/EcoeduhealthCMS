import { ActionIcon, Button, Divider, NumberInput, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconPlus, IconTrash } from '@tabler/icons-react';

import { useCreateQuestions, useUpdateQuestions } from '../api';
import { Questions, QuestionsDTO, Quiz } from '../types';

type Props = {
  onSuccess?: (result: Questions) => void;
  quiz?: Quiz;
  questions?: Questions;
};

export const QuestionForm: React.FC<Props> = ({ quiz, questions, onSuccess }) => {
  const form = useForm<QuestionsDTO>({
    initialValues: {
      text: questions?.text || '',
      answers: questions?.answers || [
        {
          text: '',
          value: 0,
        },
      ],
    },
  });
  const createMutation = useCreateQuestions();
  const updateMutation = useUpdateQuestions();

  const handleSubmit = form.onSubmit(async (values) => {
    if (!questions) {
      await createMutation.mutateAsync(
        { data: { ...values, quizId: quiz?.id } },
        {
          onError({ response }) {
            form.setErrors((response?.data as any).errors);
          },
          onSuccess({ result }) {
            notifications.show({
              message: 'Pertanyaan berhasil dibuat',
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
        { id: questions.id, data: { ...values, quizId: quiz?.id } },
        {
          onError({ response }) {
            form.setErrors((response?.data as any).errors);
          },
          onSuccess({ result }) {
            notifications.show({
              message: 'Pertanyaan berhasil diubah',
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
    modals.closeAll();
  });

  return (
    <form className="relative" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <div className="w-full pb-2">
          <TextInput
            {...form.getInputProps(`text`)}
            label="Pertanyaan"
            placeholder="Masukan Pertanyaan"
            className="col-span-12 lg:col-span-6"
            required
          />
        </div>
        <Divider />
        <h1 className="py-1 font-semibold text-sm">Jawaban</h1>

        {form.values.answers?.map((_, index) => (
          <div
            key={`answers_${index}`}
            className="flex w-full items-center space-x-4 mb-1 last:mb-0"
          >
            <div className="grid grid-cols-1 md:grid-cols-12  gap-3 flex-grow w-full">
              <TextInput
                {...form.getInputProps(`answers.${index}.text`)}
                placeholder={'Masukkan Jawaban'}
                className="col-span-6"
              />
              <div className="flex items-center space-x-2 col-span-6">
                <span className="font-medium text-sm text-gray-800 ">Nilai Jawaban</span>
                <NumberInput
                  {...form.getInputProps(`answers.${index}.value`)}
                  placeholder="Masukan Nilai"
                  className=" "
                  allowDecimal
                  step={1}
                  decimalScale={3}
                  thousandSeparator="."
                  decimalSeparator=","
                />
              </div>
            </div>
            <ActionIcon
              variant="subtle"
              color="red"
              radius="lg"
              disabled={form.values.answers && form.values.answers.length <= 1}
              onClick={() => form.removeListItem(`answers`, index)}
            >
              <IconTrash size={18} />
            </ActionIcon>
          </div>
        ))}
        <div className="flex-shrink-0">
          <Button
            size="xs"
            variant="light"
            leftSection={<IconPlus size={14} />}
            onClick={() =>
              form.insertListItem(`answers`, {
                text: '',
                value: 0,
              })
            }
          >
            Tambah Jawaban
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-end gap-4 mt-4">
        <Button
          type="button"
          variant="default"
          onClick={() => modals.closeAll()}
          loading={!questions ? createMutation.isPending : updateMutation.isPending}
        >
          Batal
        </Button>
        <Button
          type="submit"
          loading={!questions ? createMutation.isPending : updateMutation.isPending}
        >
          {!questions ? 'Tambah' : 'Ubah'}
        </Button>
      </div>
    </form>
  );
};
