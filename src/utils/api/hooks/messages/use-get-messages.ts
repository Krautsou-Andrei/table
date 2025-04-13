import { useQuery } from '@tanstack/react-query'

import { getMessages } from '../../requests/messages/get-messages'

import { QUERY_KEYS } from '@/consts/query-keys'

export const useGetMessages = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.MESSAGES],
    queryFn: async () => {
      try {
        const result = await getMessages({})

        return result
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {}
    },
  })
}
