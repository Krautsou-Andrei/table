import { useMutation } from '@tanstack/react-query'
import { getEventParticipants } from '../../requests/events/get-event-participants'

export const useGetParticipants = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      try {
        await getEventParticipants({ params: { id: id } })
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {}
    },
  })
}
