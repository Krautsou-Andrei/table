import { useMutation, useQueryClient } from '@tanstack/react-query'

import { deleteEvent } from '../../requests/events/delete-event'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/consts/routes'

export const useDeleteEvent = () => {
  const client = useQueryClient()
  const navigate = useNavigate()
  return useMutation({
    mutationFn: async (id: string) => {
      try {
        await deleteEvent({ params: { id: id } })
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {}
    },
    onSuccess: () => {
      toast.success('Мероприятие удалено')
      navigate(ROUTES.ADMIN_USERS)
      client.clear()
    },
    onError: () => {
      toast.error('Произошла ошибка при удалении мероприятия')
    },
  })
}
