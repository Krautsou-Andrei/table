import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { SendAllMessageDto } from '@/types/api'
import { sendAllMessage } from '../../requests/messages/send-all-message'

interface AllMessageProps {
  id: string
  dto: SendAllMessageDto
}

export const useSendAllMessage = () => {
  return useMutation({
    mutationFn: async ({ id, dto }: AllMessageProps) => {
      try {
        await sendAllMessage({
          params: {
            id: id,
            dto: dto,
          },
        })
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {}
    },
    onSuccess: () => {
      toast.success('Отправлено')
    },
    onError: () => {
      toast.error('Произошла ошибка при создания мероприятия')
    },
  })
}
