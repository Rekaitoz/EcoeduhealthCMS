import { MantineProvider, MantineThemeOverride } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';

import { DateProvider } from './DateProvider';

import '@/styles/globals.css';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/dates/styles.css';
import 'swiper/css';

const theme: MantineThemeOverride = {
  fontFamily: 'Nunito, sans-serif',
  headings: {
    fontFamily: 'Nunito, sans-serif',
  },
  colors: {
    primary: [
      '#E7F5FF',
      '#D0EBFF',
      '#A5D8FF',
      '#74C0FC',
      '#4DABF7',
      '#339AF0',
      '#228BE6',
      '#1C7ED6',
      '#1971C2',
      '#1864AB',
    ],
    blue: [
      '#E7F5FF',
      '#D0EBFF',
      '#A5D8FF',
      '#74C0FC',
      '#4DABF7',
      '#339AF0',
      '#228BE6',
      '#1C7ED6',
      '#1971C2',
      '#1864AB',
    ],
  },
};

type Props = {
  children: React.ReactNode;
};

export const StyleProvider: React.FC<Props> = ({ children }) => {
  // const { pathname } = useLocation();

  // useEffect(() => {
  //   const root = document.getElementById('root');
  //   root?.scrollTo(0, 0);
  // }, [pathname]);

  return (
    <MantineProvider theme={theme}>
      <DateProvider>
        <ModalsProvider labels={{ confirm: 'Konfirmasi', cancel: 'Batal' }}>
          {children}
        </ModalsProvider>
        <Notifications />
      </DateProvider>
    </MantineProvider>
  );
};
