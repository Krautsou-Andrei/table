import { useMutation, useQueryClient } from '@tanstack/react-query'

import { leaveEvent } from '../../requests/events/leave-event'

export const useLeaveEvent = () => {
  const client = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      try {
        await leaveEvent({ params: { id: id } })
        client.clear()
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {}
    },
  })
}
