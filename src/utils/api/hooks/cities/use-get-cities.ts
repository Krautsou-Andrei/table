import { useQuery } from '@tanstack/react-query'

import { getCities } from '../../requests/cities/get-cities'

import { QUERY_KEYS } from '@/consts/query-keys'

export const useGetCities = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CITIES],
    queryFn: async () => {
      try {
        const result = await getCities({})
        return result
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {}
    },
    select: (data) => data?.data,
  })
}
