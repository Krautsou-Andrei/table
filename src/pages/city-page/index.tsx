import { useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getCity } from '@/utils/api/requests/cities/get-city.ts'
import { deleteCity } from '@/utils/api/requests/cities/delete-city.ts'
import { Card } from '@/components/ui/card.tsx'
import { Button } from '@/components/ui/button.tsx'
import { Loader2, X } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area.tsx'
import { editCity } from '@/utils/api/requests/cities/edit-city.ts'
import { Label } from '@/components/ui/label.tsx'
import { Input } from '@/components/ui/input.tsx'
import { useState } from 'react'
import toast from 'react-hot-toast'
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
import { Spinner } from '@/components/ui/spinner.tsx'
import useBackButton from '@/utils/hooks/useBackButton.ts'

function CityPage() {
  useBackButton()
  const { id } = useParams()
  const [newId, setNewId] = useState<string>('')
  const navigate = useNavigate()

  const {
    data: city,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [`city-${id}`],
    queryFn: () => getCity({ params: { id: id! } }),
    select: (data) => data.data,
  })

  const { mutate: remove } = useMutation({
    mutationFn: deleteCity,
    onSuccess: () => {
      toast.success('Город был удален успешно')
      navigate('/cities')
    },
    onError: () => {
      toast.error('Возникла ошибка при удалении города')
    },
  })

  const { mutate: edit, isPending: isEditing } = useMutation({
    mutationFn: editCity,
    onSuccess: async () => {
      await refetch()
      toast.success('Список чатов был изменен успешно')
    },
    onError: () => {
      toast.error('Возникла ошибка при изменении чатов')
    },
  })

  const handleDeleteChat = (chat_id: string) => {
    if (city && id) {
      const newChats = city.chats.filter((chatId) => chatId !== chat_id)
      edit({ params: { id: id, dto: { name: city.name, chats: newChats } } })
    }
  }

  const handleAddChat = (chat_id: string) => {
    if (city && id) {
      const newChats = [...city.chats, chat_id]
      edit({ params: { id: id, dto: { name: city.name, chats: newChats } } })
    }
    if (!chat_id) {
      toast.error('Введите ID чата')
    }
  }

  const handleDeleteCity = () => {
    remove({ params: { id: id! } })
  }

  if (isLoading) {
    return (
      <div className='flex h-[100vh] w-[100vw] items-center justify-center'>
        <Spinner />
      </div>
    )
  }

  return (
    <div className='container flex flex-col gap-4 p-4 pb-16'>
      <h1 className='text-2xl font-bold'>{city?.name}</h1>
      <ScrollArea>
        {city &&
          city.chats.map((chat) => (
            <Card className='flex w-full max-w-md flex-row items-center justify-between gap-4 bg-gradient-to-r from-gray-800 to-gray-900 p-4 shadow-lg transition-all hover:shadow-xl'>
              <div className='flex-grow'>
                <h2 className='text-xl font-semibold text-white'>Chat-{chat}</h2>
              </div>
              <Button
                variant='outline'
                size='icon'
                className='text-gray-400 hover:bg-gray-700 hover:text-white'
                onClick={() => handleDeleteChat(chat)}
              >
                {isEditing ? (
                  <Loader2 className='h-8 w-8 animate-spin text-primary' />
                ) : (
                  <>
                    <X className='h-5 w-5' />
                    <span className='sr-only'>Remove chat</span>
                  </>
                )}
              </Button>
            </Card>
          ))}
      </ScrollArea>

      <div className='flex flex-col gap-2'>
        <Label>Идентификатор чата</Label>
        <Input value={newId} onChange={(e) => setNewId(e.target.value)} />
        <Button onClick={() => handleAddChat(newId)}>Добавить чат</Button>
      </div>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant='destructive'>Удалить город</Button>
        </AlertDialogTrigger>
        <AlertDialogContent className='w-[95%] rounded-xl'>
          <AlertDialogHeader>
            <AlertDialogTitle>Вы уверены, что хотите удалить город?</AlertDialogTitle>
            <AlertDialogDescription>
              Это действие нельзя отменить. Данные о городе удалятся, что может затронуть существуюшие мероприятия и
              чаты.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button variant='destructive' onClick={handleDeleteCity}>
                Удалить город
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default CityPage
