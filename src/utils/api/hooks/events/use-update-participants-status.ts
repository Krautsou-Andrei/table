import { useMutation } from '@tanstack/react-query'

import { updateParticipantStatus } from '../../requests/events/update-participant-status'

import { UpdateParticipantStatusParams } from '@/types/api'

export const useUpdateParticipantsStatus = () => {
  return useMutation({
    mutationFn: async ({ id, DTO }: UpdateParticipantStatusParams) => {
      try {
        await updateParticipantStatus({ params: { id: id, DTO: DTO } })
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {}
    },
  })
}
