import { useMutation, useQueryClient } from '@tanstack/react-query'

import { finishEvent } from '../../requests/events/finish-event'

export const useFinishEvent = () => {
  const client = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      try {
        await finishEvent({ params: { id: id } })
        client.clear()

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {}
    },
  })
}
