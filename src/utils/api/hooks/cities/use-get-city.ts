import { useQuery } from '@tanstack/react-query'

import { getCity } from '../../requests/cities/get-city'

import { QUERY_KEYS } from '@/consts/query-keys'

export const useGetCity = (id: string, isFetch: boolean) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CITY, id],
    queryFn: async () => {
      try {
        const result = await getCity({ params: { id: id } })
        return result
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {}
    },
    enabled: isFetch,
    select: (data) => data?.data,
  })
}
