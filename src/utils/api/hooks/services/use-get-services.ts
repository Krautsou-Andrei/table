import { useQuery } from '@tanstack/react-query'

import { getServices } from '../../requests/seervices/get-services'

import { QUERY_KEYS } from '@/consts/query-keys'

export const useGetServices = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.SERVICES],
    queryFn: async () => {
      try {
        const result = await getServices({})
        return result
      } catch (error) {}
    },
    select: (data) => data?.data,
  })
}
