import { useQuery } from '@tanstack/react-query'

import { QUERY_KEYS } from '@/consts/query-keys'

import { getAllUsersByIds } from '../../requests/user/get-all-users-by-ids'
import { GetUsersByIds } from '@/types/api'

export const useGetAllUsersByIds = (params: GetUsersByIds, isFetch: boolean = true) => {
  return useQuery({
    queryKey: [QUERY_KEYS.ALL_USERS_EVENT, params.userIds],
    queryFn: async () => {
      try {
        const result = await getAllUsersByIds({ params: { userIds: params.userIds || '' } })

        return result
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {}
    },
    enabled: isFetch,
    select: (data) => data?.data,
  })
}
