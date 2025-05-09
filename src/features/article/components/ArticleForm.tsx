import { Button, Card, MultiSelect, TextInput } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { RichTextEditor, Link } from '@mantine/tiptap';
import { IconCheck } from '@tabler/icons-react';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useMemo } from 'react';

import { useCategorys } from '@/features/category';
import { useTags } from '@/features/tag';

import { useCreateArticle, useUpdateArticle } from '../api';
import { Article, ArticleDTO } from '../types';

type Props = {
  article?: Article;
  onSuccess?: (result: Article) => void;
  onCancel?: () => void;
};

export const ArticleForm: React.FC<Props> = ({ article, onCancel, onSuccess }) => {
  const { data: categories } = useCategorys();
  const { data: tags } = useTags();

  console.log(article);

  const categoryOptions = useMemo(() => {
    return categories?.result.map((category) => ({
      label: category.name,
      value: String(category.id),
    }));
  }, [categories]);

  const tagOptions = useMemo(() => {
    return tags?.result.map((tag) => ({
      label: tag.name,
      value: String(tag.id),
    }));
  }, [tags]);

  const createMutation = useCreateArticle();
  const updateMutation = useUpdateArticle();
  const form = useForm<ArticleDTO>({
    initialValues: {
      title: article?.title || '',
      content: article?.content ?? '',
      publishedAt: article?.publishedAt ? new Date(article.publishedAt) : undefined,
      categories: article?.categories.map((category) => String(category.id)) ?? [],
      tags: article?.tags.map((tag) => String(tag.id)) ?? [],
    },
  });

  console.log(form.values);

  const editor = useEditor({
    extensions: [StarterKit, Link],
    content: form.values.content,
    onUpdate: ({ editor }) => {
      form.setFieldValue('content', editor.getHTML());
    },
  });

  const handleSubmit = form.onSubmit(async (values) => {
    if (!article) {
      await createMutation.mutateAsync(
        { data: values },
        {
          onError({ response }) {
            form.setErrors((response?.data as any).errors);
          },
          onSuccess({ result }) {
            notifications.show({
              message: 'Article berhasil dibuat',
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
        { id: article.id, data: values },
        {
          onError({ response }) {
            form.setErrors((response?.data as any).errors);
          },
          onSuccess({ result }) {
            notifications.show({
              message: 'Article berhasil diubah',
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
            <h2 className="text-gray-800">{!article ? 'Add New' : 'Update'} Article</h2>
          </div>
        </div>
      </Card.Section>

      <Card.Section p="md">
        <div className="grid grid-cols-12 gap-4">
          <TextInput
            {...form.getInputProps('title')}
            label="Title"
            description="Title Of the Article"
            placeholder="Insert Article Title"
            className="col-span-12 lg:col-span-6"
            required
          />
          <div className="col-span-12 ">
            <span className="text-sm font-medium">Content</span>
            <RichTextEditor editor={editor}>
              <RichTextEditor.Toolbar sticky stickyOffset={60}>
                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.Bold />
                  <RichTextEditor.Italic />
                  <RichTextEditor.Underline />
                  <RichTextEditor.Strikethrough />
                  <RichTextEditor.ClearFormatting />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.H1 />
                  <RichTextEditor.H2 />
                  <RichTextEditor.H3 />
                  <RichTextEditor.H4 />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.Blockquote />
                  <RichTextEditor.Hr />
                  <RichTextEditor.BulletList />
                  <RichTextEditor.OrderedList />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.Link />
                  <RichTextEditor.Unlink />
                </RichTextEditor.ControlsGroup>
              </RichTextEditor.Toolbar>

              <RichTextEditor.Content />
            </RichTextEditor>
          </div>
          <DatePickerInput
            {...form.getInputProps('publishedAt')}
            label="Published At"
            description="Published At Of the Article"
            placeholder="Insert Article Published At"
            className="col-span-12 lg:col-span-6"
            required
          />
          <MultiSelect
            {...form.getInputProps('categories')}
            label="Categories"
            description="Categories Of the Article"
            placeholder="Insert Article Categories"
            className="col-span-12 lg:col-span-6"
            data={categoryOptions}
            required
          />
          <MultiSelect
            {...form.getInputProps('tags')}
            label="Tags"
            description="Tags Of the Article"
            placeholder="Insert Article Tags"
            className="col-span-12 lg:col-span-6"
            data={tagOptions}
            required
          />
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
