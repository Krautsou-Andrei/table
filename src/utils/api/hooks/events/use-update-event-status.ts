import { useMutation } from '@tanstack/react-query'

import { updateEventStatus } from '../../requests/events/update-event-status'
import { UpdateEventStatusParams } from '@/types/api'

export const useUpdateEventStatus = () => {
  return useMutation({
    mutationFn: async ({ id, dto }: UpdateEventStatusParams) => {
      try {
        await updateEventStatus({ params: { id: id, dto: dto } })
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {}
    },
  })
}
