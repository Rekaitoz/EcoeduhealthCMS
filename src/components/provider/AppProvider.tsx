import { QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router } from 'react-router-dom';

import { AuthProvider } from '@/features/auth';
import { queryClient } from '@/lib/react-query';

import '@mantine/tiptap/styles.css';
import { ErrorProvider } from './ErrorProvider';
import { StyleProvider } from './StyleProvider';

type Props = {
  children: React.ReactNode;
};

export const AppProvider: React.FC<Props> = ({ children }) => {
  return (
    <ErrorProvider>
      <QueryClientProvider client={queryClient}>
        <StyleProvider>
          <Router>
            <AuthProvider>
              <HelmetProvider>{children}</HelmetProvider>
            </AuthProvider>
          </Router>
        </StyleProvider>
      </QueryClientProvider>
    </ErrorProvider>
  );
};
