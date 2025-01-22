import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { GeneralResponse } from '@/types/api';

import { User, UserRequest } from '../types';

type UserCreateDTO = {
  data: UserRequest;
};

export async function createUser({ data }: UserCreateDTO) {
  const res = await axios.post<GeneralResponse<User>>('/user', data);

  return res.data;
}

type UseCreateUserOptions = {
  config?: MutationConfig<typeof createUser>;
};

export function useCreateUser({ config }: UseCreateUserOptions = {}) {
  return useMutation(createUser, {
    ...config,
    onSuccess: (...args) => {
      queryClient.invalidateQueries(['users']);

      if (config?.onSuccess) {
        config.onSuccess(...args);
      }
    },
  });
}
