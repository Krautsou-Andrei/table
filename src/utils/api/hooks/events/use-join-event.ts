import { useMutation, useQueryClient } from '@tanstack/react-query'

import { joinEvent } from '../../requests/events/join-event'

export const useJoinEvent = () => {
  const client = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => {
      try {
        await joinEvent({ params: { id: id } })
        client.clear()
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {}
    },
  })
}
