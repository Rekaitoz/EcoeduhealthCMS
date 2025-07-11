export type Role = 'admin' | 'user';

export type User = {
  id: number;
  name: string;
  username: string;
  role: Role;
  status: 'active' | 'inactive';
  birthDate: string;
  createdAt: Date;
  updatedAt: Date;
};

export type UserRequest = {
  name: string;
  username: string;
  password?: string;
  role: Role;
  status?: true | false;
  statusTemp: 'active' | 'inactive';
  birthDate: Date | null;
};

export type UserQuery = {
  page?: number;
  limit?: number;
  role?: User['role'] | `-${User['role']}`;
};
