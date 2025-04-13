import { useMutation } from '@tanstack/react-query'

import { deleteParticipant } from '../../requests/events/delete-participant'

export const useDeleteParticipant = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      try {
        await deleteParticipant({ params: { id: id } })
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {}
    },
  })
}
