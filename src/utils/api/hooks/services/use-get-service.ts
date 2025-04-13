import { useQuery } from '@tanstack/react-query'

import { getService } from '../../requests/seervices/get-service'

import { QUERY_KEYS } from '@/consts/query-keys'

export const useGetService = (id: string, isFetch: boolean) => {
  return useQuery({
    queryKey: [QUERY_KEYS.SERVICES, id],
    queryFn: async () => {
      try {
        const result = await getService({ params: { id: id } })
        return result
      } catch (error) {}
    },
    select: (data) => data?.data,
    enabled: isFetch,
  })
}
