import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { GeneralResponse } from '@/types/api';

import { User } from '../types';

type UserDeleteDTO = {
  id: number;
};

export async function deleteUser({ id }: UserDeleteDTO) {
  const res = await axios.delete<GeneralResponse<User>>(`/user/${id}`);

  return res.data;
}

type UseDeleteUserOptions = {
  config?: MutationConfig<typeof deleteUser>;
};

export function useDeleteUser({ config }: UseDeleteUserOptions = {}) {
  return useMutation({
    ...config,
    mutationFn: deleteUser,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });

      if (config?.onSuccess) {
        config.onSuccess(...args);
      }
    },
  });
}
