import { useQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import { Employee } from '../types';

type EmployeeRequest = {
  id: number;
};

export async function getEmployee({ id }: EmployeeRequest) {
  const res = await axios.get<Employee>(`/employee/${id}`);

  return res.data;
}

type QueryFnType = typeof getEmployee;

type UseEmployeeOptions = {
  id: number;
  config?: QueryConfig<QueryFnType>;
};

export function useEmployee({ config, id }: UseEmployeeOptions) {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['employee', id],
    queryFn: () => getEmployee({ id }),
  });
}
