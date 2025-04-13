import { Dispatch, SetStateAction } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { createEvent } from '../../requests/events/create-event'

import { CreateEventDTO } from '@/types/api'

interface UseCreateEventParams {
  handleSuccess: () => void
  setIdEvent: Dispatch<SetStateAction<number>>
}

export const useCreateNewEvent = ({ handleSuccess, setIdEvent }: UseCreateEventParams) => {
  const client = useQueryClient()

  return useMutation({
    mutationFn: async (DTO: CreateEventDTO) => {
      try {
        const result = await createEvent({ params: DTO })
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
