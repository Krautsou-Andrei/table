import { useQuery } from '@tanstack/react-query'

import { getEvent } from '../../requests/events/get-event'

import { QUERY_KEYS } from '@/consts/query-keys'

export const useGetEvent = (id: string, isFetch: boolean) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_EVENT],
    queryFn: async () => {
      try {
        const result = await getEvent({ params: { id: id } })

        return result
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {}
    },
    enabled: isFetch,
  })
}
