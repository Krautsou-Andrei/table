import { Dispatch, SetStateAction } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { editEvent } from '../../requests/events/edit-event'
import { EditEventParams } from '@/types/api'

interface UseEditEventParams {
  handleSuccess: () => void
  setIdEvent: Dispatch<SetStateAction<number>>
}

export const useEditEvent = ({ handleSuccess, setIdEvent }: UseEditEventParams) => {
  const client = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, DTO }: EditEventParams) => {
      try {
        const result = await editEvent({ params: { id: id, DTO: DTO } })
        if (result.data.id) {
          setIdEvent(result.data.id)
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {}
    },
    onSuccess: () => {
      handleSuccess()
      client.clear()
    },

    onError: () => {
      toast.error('Произошла ошибка при создания мероприятия')
    },
  })
}
