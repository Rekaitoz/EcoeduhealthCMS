import { Route, Routes } from 'react-router-dom';

import { AppLayout, AuthLayout, DashboardLayout } from '@/components/layout';
import { lazyImport } from '@/utils/lazyImport';

const { Login } = lazyImport(() => import('@/features/auth'), 'Login');
const { Dashboard } = lazyImport(() => import('@/features/misc'), 'Dashboard');
const { Users } = lazyImport(() => import('@/features/user'), 'Users');
const { Quiz } = lazyImport(() => import('@/features/quiz'), 'Quiz');
const { QuizDetail } = lazyImport(() => import('@/features/quiz'), 'QuizDetail');
const { Category } = lazyImport(() => import('@/features/category'), 'Category');
const { Tag } = lazyImport(() => import('@/features/tag'), 'Tag');
const { Article } = lazyImport(() => import('@/features/article'), 'Article');
const { ArticleCreate } = lazyImport(() => import('@/features/article'), 'ArticleCreate');
const { ArticleUpdate } = lazyImport(() => import('@/features/article'), 'ArticleUpdate');

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="/user" element={<Users />} />

          <Route path="/quiz" element={<Quiz />} />
          <Route path="/quiz/detail/:id" element={<QuizDetail />} />

          <Route path="/article" element={<Article />} />
          <Route path="/article/create" element={<ArticleCreate />} />
          <Route path="/article/update/:slug" element={<ArticleUpdate />} />

          <Route path="/category" element={<Category />} />

          <Route path="/tag" element={<Tag />} />
        </Route>
      </Route>

      <Route path="/" element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
};
