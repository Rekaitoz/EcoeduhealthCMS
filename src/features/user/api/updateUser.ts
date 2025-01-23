import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { GeneralResponse } from '@/types/api';

import { User, UserRequest } from '../types';

export type UpdateUserDTO = {
  id: number;
  data: UserRequest;
};

export async function updateUser({ id, data }: UpdateUserDTO) {
  const res = await axios.put<GeneralResponse<User>>(`/user/${id}`, data);

  return res.data;
}

type UseUpdateUserOptions = {
  config?: MutationConfig<typeof updateUser>;
};

export function useUpdateUser({ config }: UseUpdateUserOptions = {}) {
  return useMutation({
    ...config,
    mutationFn: updateUser,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });

      if (config?.onSuccess) {
        config.onSuccess(...args);
      }
    },
  });
}
