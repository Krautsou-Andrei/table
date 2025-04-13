import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.tsx'
import useBackButton from '@/utils/hooks/useBackButton.ts'
import UserArchiveEventsTab from '@/pages/admin-user-page/user-archive-events-tab.tsx'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { getEvents } from '@/utils/api/requests/events/get-events.ts'
import UserMyEventsTab from '@/pages/admin-user-page/user-my-events-tab.tsx'
import UserOrganizedEventsTab from '@/pages/admin-user-page/user-organized-events-tab.tsx'
import { Spinner } from '@/components/ui/spinner.tsx'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { updateBalance } from '@/utils/api/requests/user/update-balance.ts'
import toast from 'react-hot-toast'
import lapki from '@/assets/imgs/lapki.png'
import { getUserById } from '@/utils/api/requests/user/get-user.ts'
import { Card, CardContent } from '@/components/ui/card.tsx'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { banUser } from '@/utils/api/requests/user/ban-user.ts'
import { unbanUser } from '@/utils/api/requests/user/unban-user.ts'
import { useAuthMe } from '@/utils/api/hooks/auth/use-auth-me'

function UserPage() {
  useBackButton()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [changeStartInputValue, setChangeStartInputValue] = useState('')
  const { id } = useParams()
  const { data: currentUser } = useAuthMe()

  const {
    data: requestedUser,
    isLoading: isUserLoading,
    refetch,
  } = useQuery({
    queryKey: ['user', id],
    queryFn: () => getUserById({ params: { userId: Number(id) } }),
    select: (data) => data.data,
  })

  const { data, isLoading } = useQuery({
    queryKey: ['events', `user-${id}`],
    queryFn: () => getEvents({ params: { userId: Number(id) } }),
    select: (data) => data.data,
  })

  const { mutate: saveNewBalance, isPending } = useMutation({
    mutationFn: updateBalance,
    onSuccess: async () => {
      setIsDialogOpen(false)
      setChangeStartInputValue('')
      toast.success('Баланс успешно изменен')
      await refetch()
    },
    onError: () => {
      toast.error('При обновлении баланса произошла ошибка')
    },
  })

  const { mutate: ban, isPending: banningUser } = useMutation({
    mutationFn: banUser,
    onSuccess: async () => {
      toast.success('Пользователь забанен')
      await refetch()
    },
    onError: () => {
      toast.error('Произошла ошибка')
    },
  })

  const { mutate: unban, isPending: unbanningUser } = useMutation({
    mutationFn: unbanUser,
    onSuccess: async () => {
      toast.success('Пользователь разбанен')
      await refetch()
    },
    onError: () => {
      toast.error('Произошла ошибка')
    },
  })

  const handleBanButtonClick = () => {
    ban({ params: { username: requestedUser?.username! } })
  }

  const handleUnbanButtonClick = () => {
    unban({ params: { username: requestedUser?.username! } })
  }

  if (isLoading || isUserLoading) {
    return (
      <div className='flex h-[100vh] w-[100vw] items-center justify-center'>
        <Spinner />
      </div>
    )
  }

  const handleSave = () => {
    if (requestedUser) {
      saveNewBalance({ params: { userId: requestedUser.id, dto: { balance: Number(changeStartInputValue) } } })
    }
  }

  return (
    <div className='container pb-32'>
      <header className='flex w-full flex-row items-center justify-between'>
        <h1 className='m-4 text-2xl font-bold'>{requestedUser?.username}</h1>
        {(!(currentUser?.id === Number(id)) || currentUser?.isAdmin) && (
          <Button
            onClick={() => setIsDialogOpen(true)}
            className='flex h-12 w-32 flex-row items-center justify-center rounded-l-full bg-[#6E6A6E] hover:bg-[#5D5A5D]'
          >
            <span className='mr-2 text-2xl font-bold'>{requestedUser?.starsBalance}</span>
            <img src={lapki} alt='PawIcon' width={48} height={48} />
          </Button>
        )}

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className='w-[95%] rounded-xl'>
            <DialogHeader>
              <DialogTitle>Изменить баланс</DialogTitle>
            </DialogHeader>

            <div className='flex flex-col gap-2'>
              <label htmlFor='stars' className='font-medium text-primary'>
                Stars
              </label>
              <Input
                id='stars'
                type='number'
                value={changeStartInputValue}
                onChange={(e) => {
                  const value = e.target.value
                  if (value === '' || parseInt(value) >= 0) {
                    setChangeStartInputValue(value)
                  }
                }}
              />
            </div>

            <DialogFooter>
              <Button onClick={handleSave} disabled={changeStartInputValue === ''}>
                {isPending ? <Loader2 className='spin' /> : 'Сохранить'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </header>
      <main className='container flex flex-col gap-2 p-4'>
        <Card className='bg-[linear-gradient(180deg,_#82B1FF_0%,_#6f7aff_100%)]'>
          <CardContent className='pt-6'>
            <div className='flex h-full w-full flex-row flex-wrap items-center justify-between gap-4'>
              <div className='flex flex-row gap-2'>
                <h2 className='text-nowrap text-lg font-bold'>Telegram ID:</h2>
                <p className='text-lg'>{requestedUser?.telegramId}</p>
              </div>
              {(!(currentUser?.id === Number(id)) || currentUser?.isAdmin) && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button>{requestedUser?.isBanned ? 'Unban' : 'Ban'}</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className='w-[95%] rounded-xl'>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Вы уверены?</AlertDialogTitle>
                      <AlertDialogDescription>Это действие нельзя отменить</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Отмена</AlertDialogCancel>
                      <AlertDialogAction
                        disabled={banningUser || unbanningUser}
                        onClick={requestedUser?.isBanned ? handleUnbanButtonClick : handleBanButtonClick}
                      >
                        {banningUser || unbanningUser ? (
                          <Loader2 className='spin' />
                        ) : requestedUser?.isBanned ? (
                          'Разбанить'
                        ) : (
                          'Забанить'
                        )}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue='my'>
          <TabsList className='w-full'>
            <TabsTrigger value='my'>Билеты</TabsTrigger>
            <TabsTrigger value='organized'>Созданные</TabsTrigger>
            <TabsTrigger value='history'>История</TabsTrigger>
          </TabsList>
          <TabsContent value='my'>
            <UserMyEventsTab events={data?.items ?? []} userId={requestedUser?.id} />
          </TabsContent>
          <TabsContent value='organized'>
            <UserOrganizedEventsTab events={data?.items ?? []} userId={requestedUser?.id} />
          </TabsContent>
          <TabsContent value='history'>
            <UserArchiveEventsTab userId={requestedUser?.id}></UserArchiveEventsTab>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

export default UserPage
