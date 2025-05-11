import { Button, Card, MultiSelect, TextInput, Image } from '@mantine/core';
import { Dropzone, FileWithPath } from '@mantine/dropzone';
import { useForm } from '@mantine/form';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { RichTextEditor, Link } from '@mantine/tiptap';
import { IconCheck, IconPhoto, IconUpload, IconX } from '@tabler/icons-react';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useMemo, useState } from 'react';

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
  const [preview, setPreview] = useState<string | null>(article?.thumbnail?.path || null);

  const form = useForm<ArticleDTO>({
    initialValues: {
      title: article?.title || '',
      content: article?.content ?? '',
      publishedAt: article?.publishedAt ? new Date(article.publishedAt) : new Date(),
      categories: article?.categories.map((category) => String(category.id)) ?? [],
      tags: article?.tags.map((tag) => String(tag.id)) ?? [],
      thumbnail: undefined,
    },
    validate: {
      title: (value) => (!value ? 'Title is required' : null),
      content: (value) => (!value ? 'Content is required' : null),
      categories: (value) => (value.length === 0 ? 'At least one category is required' : null),
      tags: (value) => (value.length === 0 ? 'At least one tag is required' : null),
      thumbnail: (value) => (!value ? 'Thumbnail is required' : null),
    },
  });

  const editor = useEditor({
    extensions: [StarterKit, Link],
    content: form.values.content,
    onUpdate: ({ editor }) => {
      form.setFieldValue('content', editor.getHTML());
    },
  });

  const handleSubmit = form.onSubmit(async (values) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('content', values.content);
    if (values.publishedAt) {
      formData.append('publishedAt', values.publishedAt.toISOString());
    }
    values.categories.forEach((category) => {
      formData.append('categoryIds', category);
    });
    values.tags.forEach((tag) => {
      formData.append('tagIds', tag);
    });
    if (values.thumbnail) {
      console.log(values);

      formData.append('thumbnail', values.thumbnail);
    }

    if (!article) {
      await createMutation.mutateAsync(
        { data: formData },
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
        { id: article.id, data: formData },
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

  const handleOpenUploadModal = () => {
    modals.open({
      title: 'Upload Thumbnail',
      size: 'lg',
      children: (
        <div className="p-4">
          <Dropzone
            onDrop={(files: FileWithPath[]) => {
              const file = files[0];
              form.setFieldValue('thumbnail', file);
              setPreview(URL.createObjectURL(file));
              modals.closeAll();
            }}
            maxFiles={1}
            accept={['image/png', 'image/jpeg', 'image/jpg']}
            classNames={{
              root: 'data-[accept]:bg-blue-100 data-[accept]:border-blue-500 data-[accept]:text-blue-500 data-[reject]:bg-red-100 data-[reject]:border-red-500 data-[reject]:text-red-500 border-2 border-dashed border-gray-300 rounded-lg transition-all duration-200 hover:bg-gray-50',
            }}
          >
            <div className="flex py-24 px-5 items-center justify-center gap-2 pointer-events-none">
              <Dropzone.Accept>
                <IconUpload size={52} className="text-blue-500" />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <IconX size={52} className="text-red-500" />
              </Dropzone.Reject>
              <Dropzone.Idle>
                <IconPhoto size={52} className="text-gray-400 group-hover:text-blue-500" />
              </Dropzone.Idle>
              <div className="text-base text-left ">
                <p>Drag image here or click to select</p>
                <p className="text-xs text-gray-500">Only PNG, JPG files are accepted</p>
              </div>
            </div>
          </Dropzone>
        </div>
      ),
    });
  };

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
            className="col-span-12 "
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
          <div className="col-span-12 lg:col-span-6">
            <div className="mb-2">
              <span className="text-sm font-medium">Thumbnail</span>
              <span className="text-red-500 ml-1">*</span>
            </div>
            <div className="flex flex-col gap-4">
              <button
                className={`w-full flex items-center justify-start px-2 py-2 rounded-md bg-transparent border ${
                  form.errors.thumbnail ? 'border-red-500' : 'border-gray-300'
                } gap-2 active:border-blue-500 active:translate-y-0.5`}
                onClick={handleOpenUploadModal}
                type="button"
              >
                <span className={`text-sm font-medium ${preview ? 'text-black' : 'text-gray-500'}`}>
                  {preview ? form.values.thumbnail?.name : 'Upload Thumbnail'}
                </span>
              </button>
              {form.errors.thumbnail && (
                <span className="text-xs text-red-500">{form.errors.thumbnail}</span>
              )}
              {preview && (
                <div className="relative w-56 rounded-md overflow-hidden">
                  <Image src={preview} alt="Thumbnail preview" className="object-contain" />
                </div>
              )}
            </div>
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
