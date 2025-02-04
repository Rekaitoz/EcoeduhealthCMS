import { Button, TextInput, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';

import { useUpdateQuiz } from '../api';
import { Quiz, QuizDTO } from '../types';

type Props = {
  quiz: Quiz;
  onSuccess?: VoidFunction;
};

export const QuizUpdateForm: React.FC<Props> = ({ quiz, onSuccess }) => {
  const form = useForm<QuizDTO>({
    initialValues: {
      name: quiz.name,
      description: quiz.description,
    },
  });

  const { mutateAsync, isPending } = useUpdateQuiz();

  const handleSubmit = form.onSubmit(async (values) => {
    await mutateAsync(
      { id: quiz.id, data: values },
      {
        onError({ response }) {
          form.setErrors((response?.data as any).errors);
        },
        onSuccess() {
          if (onSuccess) {
            onSuccess();
          }
          notifications.show({
            message: 'Kuesioner berhasil diubah',
            color: 'green',
            icon: <IconCheck />,
          });
          modals.closeAll();
        },
      }
    );
  });

  return (
    <form className="relative" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <TextInput
          {...form.getInputProps('name')}
          label="Nama Quiz"
          placeholder="Masukan Nama Quiz"
          required
        />
        <Textarea
          {...form.getInputProps('description')}
          label="Deksripsi"
          placeholder="Masukan Dekskripsi Quiz"
          required
        />
      </div>

      <div className="flex items-center justify-end gap-4 mt-4">
        <Button
          type="button"
          variant="default"
          onClick={() => modals.closeAll()}
          loading={isPending}
        >
          Batal
        </Button>
        <Button type="submit" loading={isPending}>
          Simpan
        </Button>
      </div>
    </form>
  );
};
