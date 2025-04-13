import { useQuery } from '@tanstack/react-query'
import { getLeaders } from '../../requests/user/get-leaders'
import { QUERY_KEYS } from '@/consts/query-keys'

export const useGetLeaders = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.LEADERS],
    queryFn: async () => {
      try {
        const response = await getLeaders({})

        return response
      } catch (error) {}
    },
    select: (data) => data?.data,
  })
}
