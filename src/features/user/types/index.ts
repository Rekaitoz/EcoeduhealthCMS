export type Role = 'superadmin' | 'owner' | 'employee';

export type User = {
  id: number;
  name: string;
  username: string;
  role: Role;
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
};

export type UserRequest = {
  name: string;
  username: string;
  password?: string;
  role: Role;
  status: 'active' | 'inactive';
};

export type UserQuery = {
  page?: number;
  limit?: number;
  role?: User['role'] | `-${User['role']}`;
};
