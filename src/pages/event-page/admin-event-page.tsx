import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button.tsx'
import { Loader2, Users, X } from 'lucide-react'
import { formatDisplayedDate } from '@/utils/formatDate.ts'
import { Badge } from '@/components/ui/badge.tsx'
import { Card } from '@/components/ui/card.tsx'
import { Switch } from '@/components/ui/switch.tsx'
import { CityEvent, UpdateParticipantStatusDTO } from '@/types/api'
import { ScrollArea } from '@/components/ui/scroll-area.tsx'
import { useMutation } from '@tanstack/react-query'
import { updateParticipantStatus } from '@/utils/api/requests/events/update-participant-status.ts'
import { useRef, useState } from 'react'
import { deleteParticipant } from '@/utils/api/requests/events/delete-participant.ts'
import toast from 'react-hot-toast'
import { finishEvent } from '@/utils/api/requests/events/finish-event.ts'
import { joinEvent } from '@/utils/api/requests/events/join-event.ts'

import useBackButton from '@/utils/hooks/useBackButton.ts'
import { leaveEvent } from '@/utils/api/requests/events/leave-event.ts'
import { useWebApp } from '@vkruglikov/react-telegram-web-app'
import { useGetEvent } from '@/utils/api/hooks/events/use-get-event'
import { ROUTES } from '@/consts/routes'
import { useAuthMe } from '@/utils/api/hooks/auth/use-auth-me'
import { useGetUser } from '@/utils/api/hooks/user/use-get-user'

import { useGetAllUsersByIds } from '@/utils/api/hooks/user/use-get-all-users-by-ids'
import { useDeleteEvent } from '@/utils/api/hooks/events/use-delete-event'

enum ParticipantStatus {
  JOINED = 'JOINED',
  PARTICIPATED = 'PARTICIPATED',
}

export interface AdminEventPageProps {
  event: CityEvent
  refetch: () => Promise<void>
}

export const AdminEventPage = () => {
  useBackButton()
  const { id } = useParams()
  const { data: event, refetch } = useGetEvent(id!, Boolean(id))

  const navigate = useNavigate()
  const userIdsRef = useRef<number[]>([])
  const { data: user } = useAuthMe()

  const usersIds = event?.data.participants.map((item) => item.userId).join(',')

  const { data: allUsersEvent } = useGetAllUsersByIds(
    { userIds: usersIds || '' },
    Boolean(event?.data.participants.length && event?.data.participants.length > 0)
  )

  const [isUserParticipant, setIsUserParticipant] = useState(
    event?.data?.participants.some((participant) => participant.userId === user?.id)
  )
  const isUserOrganizer = useRef<boolean>(event?.data?.organizerId === user?.id)
  const [processingParticipantId, setProcessingParticipantId] = useState<number | null>(null)

  const changeParticipantStatus = (userId: number, checked: boolean) => {
    if (checked) {
      userIdsRef.current.push(userId)
    } else {
      userIdsRef.current = userIdsRef.current.filter((id) => id !== userId)
    }
  }

  const { data: userOrganizer } = useGetUser({ userId: event?.data?.organizerId! }, Boolean(event?.data?.organizerId))

  const { mutate: markParticipants, isPending: participantStatusChanging } = useMutation({
    mutationFn: updateParticipantStatus,
    onSuccess: () => {
      finish({ params: { id: id! } })
      toast.success('Участники мероприятия отмечены успешно')
    },
    onError: () => {
      toast.error('Не удалось отметить участников мероприятия')
    },
  })

  const { mutate: finish, isPending: eventFinishing } = useMutation({
    mutationFn: finishEvent,
    onSuccess: async () => {
      await refetch()
      toast.success('Мероприятия завершено успешно')
    },
    onError: () => {
      toast.error('Не удалось завершить мероприятие')
    },
  })

  const { mutate: removeParticipant, isPending: removingParticipant } = useMutation({
    mutationFn: deleteParticipant,
    onSuccess: async () => {
      setProcessingParticipantId(null)
      await refetch()
      toast.success('Участник был удален успешно')
    },
    onError: () => {
      toast.error('Произошла ошибка')
    },
  })

  const { mutateAsync: deleteEvent } = useDeleteEvent()

  const handleFinishEventClick = () => {
    const participants: UpdateParticipantStatusDTO = {
      participants: userIdsRef.current.map((id) => ({
        userId: id,
        status: ParticipantStatus.PARTICIPATED,
      })),
    }
    markParticipants({ params: { id: id!, DTO: participants } })
  }

  const handleCancelEventClick = () => {
    deleteEvent(id!)
  }

  const { mutate: join, isPending: joinPending } = useMutation({
    mutationFn: joinEvent,
    onSuccess: async () => {
      setIsUserParticipant(true)
      await refetch()
    },
  })

  const { mutate: leave, isPending: leavePending } = useMutation({
    mutationFn: leaveEvent,
    onSuccess: async () => {
      setIsUserParticipant(false)
      await refetch()
    },
  })

  const handleJoinButtonClick = () => {
    join({ params: { id: id! } })
  }

  const handleUnjoinButtonClick = () => {
    leave({ params: { id: id! } })
  }

  const webApp = useWebApp()

  return (
    <div className='flex min-h-screen flex-col bg-background pb-28'>
      <div className='relative h-[240px]'>
        <div className='absolute inset-0'>
          <img src={event?.data?.image} alt='Event cover' className='h-full w-full object-cover brightness-50' />
        </div>
        <div className='absolute left-4 top-4'>
          <Badge className='bg-pink-500/80 text-white hover:bg-pink-500/70'>{event?.data?.category}</Badge>
        </div>
        <div className='absolute bottom-4 left-4 right-4 text-white'>
          <h1 className='mb-2 text-3xl font-bold'>{event?.data?.title}</h1>
          <p className='text-sm opacity-90'>{formatDisplayedDate(event?.data?.datetime)}</p>
        </div>
      </div>

      <div className='flex items-center justify-between p-4'>
        <h1 className='text-2xl font-bold'>Участники</h1>
        <div className='flex items-center gap-2 text-muted-foreground'>
          <Users className='h-5 w-5' />
          <span className='text-xl font-medium'>{event?.data?.participants.length}</span>
        </div>
      </div>

      <div className='space-y-6 p-4'>
        <section>
          <h2 className='mb-2 text-xl font-bold'>
            Организатор:{' '}
            <Button
              variant='link'
              className='h-auto p-0 text-lg text-blue-400 underline'
              onClick={() => navigate(`/admin/user/${event?.data?.organizer.id}`)}
            >
              {userOrganizer?.username}
            </Button>
          </h2>
        </section>

        <section className='flex flex-col gap-2'>
          <ScrollArea>
            {event?.data?.participants.map((participant) => {
              const user = allUsersEvent?.find((user) => user.id === participant.userId)
              return (
                <Card
                  className='mt-2 flex w-full max-w-md flex-row items-center justify-between gap-4 bg-gradient-to-r from-gray-800 to-gray-900 p-4 shadow-lg transition-all hover:shadow-xl'
                  key={participant.id}
                >
                  <div className='flex-grow'>
                    <Button
                      variant='link'
                      className='h-auto p-0 text-lg text-white'
                      onClick={() => {
                        webApp.openTelegramLink(`https://t.me/${user?.username}`)
                      }}
                    >
                      {user?.username}
                    </Button>
                  </div>
                  <Switch
                    className='data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-400'
                    onCheckedChange={(checked) => {
                      changeParticipantStatus(participant.userId, checked)
                    }}
                    disabled={participantStatusChanging}
                  />
                  <Button
                    variant='outline'
                    size='icon'
                    className='text-gray-400 hover:bg-gray-700 hover:text-white'
                    onClick={() => {
                      setProcessingParticipantId(participant.id)
                      removeParticipant({ params: { id: String(participant.id) } })
                    }}
                  >
                    {removingParticipant && processingParticipantId === participant.id ? (
                      <Loader2 className='h-8 w-8 animate-spin text-primary' />
                    ) : (
                      <>
                        <X className='h-5 w-5' />
                        <span className='sr-only'>Remove user</span>
                      </>
                    )}
                  </Button>
                </Card>
              )
            })}
          </ScrollArea>
        </section>

        <section className='flex flex-col gap-2'>
          {isUserParticipant && !isUserOrganizer.current && (
            <Button className='w-full text-wrap p-6 text-lg' onClick={handleUnjoinButtonClick}>
              {leavePending ? <Loader2 className='h-8 w-8 animate-spin text-primary' /> : 'Покинуть мероприятие'}
            </Button>
          )}
          {!isUserParticipant && !isUserOrganizer.current && (
            <Button className='w-full text-wrap p-6 text-lg' onClick={handleJoinButtonClick}>
              {joinPending ? <Loader2 className='h-8 w-8 animate-spin text-primary' /> : 'Присоединиться к мероприятию'}
            </Button>
          )}
          <Button className='w-full text-wrap p-6 text-lg' onClick={() => navigate(`${ROUTES.EVENT_ID}/${id}/edit`)}>
            Редактировать мероприятие
          </Button>
          <Button
            className='w-full text-wrap rounded-2xl p-6 text-lg'
            variant='destructive'
            onClick={handleFinishEventClick}
          >
            {participantStatusChanging || eventFinishing ? (
              <Loader2 className='h-8 w-8 animate-spin text-primary' />
            ) : (
              'Завершить мероприятие'
            )}
          </Button>
          <Button
            className='w-full text-wrap rounded-2xl p-6 text-lg'
            variant='destructive'
            onClick={handleCancelEventClick}
          >
            Отменить мероприятие
          </Button>
        </section>
      </div>
    </div>
  )
}
