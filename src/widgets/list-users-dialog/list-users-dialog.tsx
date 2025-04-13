import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'

import { Button } from '@/components/ui/button'

import { TEXT } from '@/consts/text'

import { useGetAllUsersByIds } from '@/utils/api/hooks/user/use-get-all-users-by-ids'
import { useAuthMe } from '@/utils/api/hooks/auth/use-auth-me'
import { useGetEvent } from '@/utils/api/hooks/events/use-get-event'
import { deleteParticipant } from '@/utils/api/requests/events/delete-participant'

import { X } from 'lucide-react'

interface ListUsersDialogProps {
  isOpen: boolean
  onOpenChange: () => void
  title: string
}

export const ListUsersDialog = ({ isOpen, onOpenChange, title }: ListUsersDialogProps) => {
  const { id } = useParams()

  const { data: event, refetch } = useGetEvent(id!, Boolean(id))

  const usersIds = event?.data.participants.map((item) => item.userId).join(',')
  const { data: currentUser } = useAuthMe()

  const { data: allUsersEvent } = useGetAllUsersByIds(
    { userIds: usersIds || '' },
    Boolean(event?.data.participants.length && event?.data.participants.length > 0)
  )

  const getParticipantId = (userId: number) => {
    return event?.data.participants.find((item) => item.userId === userId)
  }

  const { mutate: removeParticipant } = useMutation({
    mutationFn: deleteParticipant,
    onSuccess: async () => {
      await refetch()
      toast.success('Участник был удален успешно')
    },
    onError: () => {
      toast.error('Произошла ошибка')
    },
  })

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className='flex h-[100%] w-[100%] flex-col p-8'>
          <DialogHeader>
            <div className='mb-[10px] flex w-full justify-between'>
              <DialogTitle className='text-xl'>{title}</DialogTitle>
              <DialogClose className='shadow-none focus:shadow-none focus:outline-none' style={{ boxShadow: 'none' }}>
                <X className='h-6 w-6 text-orange-300' />
                <span className='sr-only'>Close</span>
              </DialogClose>
            </div>
          </DialogHeader>
          <div className='flex flex-1 flex-col items-center gap-2'>
            {allUsersEvent && allUsersEvent.length > 0 ? (
              allUsersEvent.map((user) => {
                if (user.id === currentUser?.id && currentUser.id === event?.data.organizerId) {
                  return
                }

                return (
                  <div
                    className={`box-shadow-form Date group mt-0.5 flex w-full items-center px-4 py-3 uppercase hover:bg-background-card hover:text-text-invert ${user.id === currentUser?.id ? 'bg-background-card text-text-invert' : 'bg-background-invert'}`}
                    key={user.id}
                  >
                    <div className='w-full'>{user.username}</div>
                    <div className=''>
                      <Button
                        variant={'fit'}
                        size={'fit'}
                        className='cursor-pointer'
                        onClick={() => removeParticipant({ params: { id: String(getParticipantId(user.id)?.id) } })}
                      >
                        <X className='h-5 w-5' />
                      </Button>
                    </div>
                  </div>
                )
              })
            ) : (
              <div className='text-center font-bold uppercase'>{TEXT.EMPTY}</div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
