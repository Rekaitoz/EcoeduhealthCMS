import { Icon } from '@tabler/icons-react';

import { Role } from '@/features/user';

export type SidebarRoute = {
  title: string;
  icon?: Icon | React.FC<React.ComponentProps<'svg'>>;
  href?: string;
  routes?: SidebarRoute[];
  role?: Array<Role | `-${Role}`>;
};

export type SidebarSection = {
  title?: string;
  routes: SidebarRoute[];
};

export type SidebarNavigation = SidebarSection[];

export type Metadata = {
  page: number;
  limit: number;
  total: number;
  count: number;
  hasNext?: boolean;
  hasPrev?: boolean;
};
