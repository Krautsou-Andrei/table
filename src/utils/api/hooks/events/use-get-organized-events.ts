import { useQuery } from '@tanstack/react-query'

import { getOrganizedEvents } from '../../requests/events/get-organized-events'

import { QUERY_KEYS } from '@/consts/query-keys'

export const useGetOrganizedEvents = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_ORGANIZED_EVENTS],
    queryFn: async () => {
      try {
        const result = await getOrganizedEvents({})

        return result
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {}
    },
    select: (data) => data?.data,
  })
}
