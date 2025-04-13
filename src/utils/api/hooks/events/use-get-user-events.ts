import { useQuery } from '@tanstack/react-query'

import { getMyEvents } from '../../requests/events/get-my-events'

import { QUERY_KEYS } from '@/consts/query-keys'

export const useGetUserEvents = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_EVENTS_USER],
    queryFn: async () => {
      try {
        const result = await getMyEvents({})

        return result
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {}
    },
    select: (data) => data?.data,
  })
}
