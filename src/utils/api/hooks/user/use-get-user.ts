import { useQuery } from '@tanstack/react-query'

import { getUserById } from '../../requests/user/get-user'

import { QUERY_KEYS } from '@/consts/query-keys'
import { GetUserParams } from '@/types/api'

export const useGetUser = (params: GetUserParams, isFetch: boolean = true) => {
  return useQuery({
    queryKey: [QUERY_KEYS.USER, params.userId],
    queryFn: async () => {
      try {
        const result = await getUserById({ params: params })

        return result
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {}
    },
    enabled: isFetch,
    select: (data) => data?.data,
  })
}
