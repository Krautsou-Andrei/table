import { useCallback, useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'

import { useGetCity } from '@/utils/api/hooks/cities/use-get-city'
import { useGetEvent } from '@/utils/api/hooks/events/use-get-event'

import { useJoinEvent } from '@/utils/api/hooks/events/use-join-event'
import { showErrorMessage } from '@/utils/notify'
import { useLeaveEvent } from '@/utils/api/hooks/events/use-leave-event'

import { Participant, UpdateParticipantStatusDTO } from '@/types/api'

import { updateParticipantStatus } from '@/utils/api/requests/events/update-participant-status'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { finishEvent } from '@/utils/api/requests/events/finish-event'
import { useAuthMe } from '@/utils/api/hooks/auth/use-auth-me'

export enum ParticipantStatus {
  JOINED = 'JOINED',
  PARTICIPATED = 'PARTICIPATED',
}

export const useEventPage = () => {
  const [isOpenListUsers, setIsOpenListUsers] = useState(false)
  const [isOpenSuccess, setIsOpenSuccess] = useState(false)
  const [isImage, setIsImage] = useState(true)

  const { id } = useParams()

  const { data: event, refetch } = useGetEvent(id!, Boolean(id))
  const { data: city } = useGetCity(String(event?.data.cityId)!, Boolean(event?.data.cityId))
  const { data: user } = useAuthMe()

  const { mutateAsync: addUser } = useJoinEvent()
  const { mutateAsync: deleteUser } = useLeaveEvent()

  const { mutate: finish } = useMutation({
    mutationFn: finishEvent,
    onSuccess: async () => {
      await refetch()
      toast.success('Мероприятия завершено успешно')
    },
    onError: () => {
      toast.error('Не удалось завершить мероприятие')
    },
  })

  const { mutate: markParticipants } = useMutation({
    mutationFn: updateParticipantStatus,
    onSuccess: () => {
      finish({ params: { id: id! } })
      toast.success('Участники мероприятия отмечены успешно')
    },
    onError: () => {
      toast.error('Не удалось отметить участников мероприятия')
    },
  })

  const date = event?.data.datetime ? new Date(event?.data.datetime) : new Date()

  const isActive = useMemo(() => {
    return user?.id && event?.data.participants.some((participant: Participant) => participant.userId === user.id)
  }, [event?.data.participants, user?.id])

  const handleChangeOpenSuccess = useCallback(async () => {
    try {
      const id = event?.data.id
      if (id && isActive) {
        await deleteUser(String(id))
      } else if (id) {
        await addUser(String(id))
        setIsOpenSuccess((prev) => !prev)
      }
    } catch (error) {
      showErrorMessage('Что-то пошло не так!')
    }
  }, [addUser, deleteUser, isActive, event?.data.id])

  const handleFinishEvent = () => {
    if (event) {
      const participants: UpdateParticipantStatusDTO = {
        participants: event.data.participants.map((participant) => ({
          userId: participant.userId,
          status: ParticipantStatus.PARTICIPATED,
        })),
      }

      markParticipants({ params: { id: id!, DTO: participants } })
    }
  }

  const handleOpenListUsers = () => {
    setIsOpenListUsers((prev) => !prev)
  }

  useEffect(() => {
    const img = new Image()
    img.src = event?.data.image || ''

    img.onload = () => {
      setIsImage(true)
    }

    img.onerror = () => {
      setIsImage(false)
    }
  }, [event?.data.image])

  return {
    state: { date, event, id, isActive, isImage, isOpenListUsers, isOpenSuccess, city, user },
    functions: { handleChangeOpenSuccess, handleFinishEvent, handleOpenListUsers },
  }
}
