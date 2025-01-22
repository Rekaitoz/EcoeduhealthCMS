export type Creds = {
  id: string | number;
  username: string;
  name: string;
  role: 'owner' | 'superadmin' | 'employee';
};
