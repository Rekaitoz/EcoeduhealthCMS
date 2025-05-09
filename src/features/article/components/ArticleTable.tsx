import { ActionIcon, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconEdit, IconTrash } from '@tabler/icons-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Table } from '@/components/elements';

import { useDeleteArticle, useArticles } from '../api';

// import { ArticleDetail } from './ArticleDetail';

const initialParams: any = {
  limit: 5,
  page: 1,
};

type Props = {
  toolbar?: React.ReactNode;
  category?: string;
  tag?: string;
} & any;

export const ArticleTable: React.FC<Props> = ({ category, tag }) => {
  const [params, setParams] = useState(initialParams);
  const { data, isLoading } = useArticles({ params: { ...params, category, tag } });
  // const { data, isLoading } = useArticles();

  const deleteMutation = useDeleteArticle();

  function handlePage(page: number) {
    setParams({ ...params, page });
  }

  // function handleDetail(article: Article) {
  //   modals.open({
  //     title: 'Article Detail',
  //     // children: <ArticleDetail data={article} />,
  //     children: <div>test</div>,
  //     size: 'lg',
  //   });
  // }

  function handleRemove(id: number) {
    return () => {
      modals.openConfirmModal({
        modalId: 'delete-article',
        title: 'Delete Article',
        children: <Text size="sm">Are You sure want to delete this Article?</Text>,
        centered: true,
        closeOnConfirm: false,
        onConfirm: async () => {
          await deleteMutation.mutateAsync(
            { id },
            {
              onSuccess: () => {
                notifications.show({
                  message: 'Article has been Deleted',
                  color: 'green',
                  icon: <IconCheck />,
                });
                modals.close('delete-article');
              },
              onError: () => {
                notifications.show({
                  message: 'Article Cannot Been Deleted',
                  color: 'red',
                });
                modals.close('delete-article');
              },
            }
          );
        },
      });
    };
  }

  return (
    <Table
      title="Tabel Data Article"
      loading={isLoading}
      header={['Article Name', 'Tags', 'Categories', 'Date', '']}
      items={data?.result}
      metadata={data?.metadata}
      onPageChange={handlePage}
      renderItem={(article) => (
        <tr key={article.id}>
          <td>
            <div>{article.title}</div>
          </td>
          {/* <td>{article.description || '-'}</td> */}

          <td>{article.tags.map((tag) => tag.name).join(', ')}</td>
          <td>{article.categories.map((category) => category.name).join(', ')}</td>
          <td>{article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : '-'}</td>
          <td>
            <div className="flex items-center space-x-2">
              <ActionIcon
                title="Update Article"
                variant="subtle"
                color="yellow"
                radius="lg"
                component={Link}
                to={`/article/update/${article.id}`}
              >
                <IconEdit size={18} />
              </ActionIcon>

              {/* <ActionIcon
                title="Detail Article"
                onClick={() => handleDetail(article)}
                variant="subtle"
                color="blue"
                radius="lg"
              >
                <IconNotes size={18} />
              </ActionIcon> */}
              <ActionIcon
                title="Delete Article"
                onClick={handleRemove(article.id)}
                variant="subtle"
                color="red"
                radius="lg"
              >
                <IconTrash size={18} />
              </ActionIcon>
            </div>
          </td>
        </tr>
      )}
    />
  );
};
