import UserEventPage from '@/pages/event-page/user-event-page.tsx'
import { useParams } from 'react-router-dom'

import { Spinner } from '@/components/ui/spinner.tsx'
import useBackButton from '@/utils/hooks/useBackButton.ts'
import { useGetEvent } from '@/utils/api/hooks/events/use-get-event'
import { useAuthMe } from '@/utils/api/hooks/auth/use-auth-me'

function EventPage() {
  const currentUser = useAuthMe()

  const { id } = useParams()

  const { data: event, isLoading, isError } = useGetEvent(id!, Boolean(id))

  useBackButton()

  if (isLoading) {
    return (
      <div className='flex h-[100vh] w-[100vw] items-center justify-center'>
        <Spinner />
      </div>
    )
  }

  if (isError || !event) {
    return (
      <div className='flex h-[100vh] w-[100vw] items-center justify-center'>
        <p>Ошибка: событие не найдено или произошла ошибка загрузки.</p>
      </div>
    )
  }

  if (!currentUser) {
    return (
      <div className='flex h-[100vh] w-[100vw] items-center justify-center'>
        <p>Ошибка: пользователь не авторизован.</p>
      </div>
    )
  }

  return <UserEventPage />
}

export default EventPage
