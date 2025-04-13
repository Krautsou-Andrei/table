import AppCard from '@/pages/homepage/app-card.tsx'
import { Button } from '@/components/ui/button.tsx'
import { useNavigate } from 'react-router-dom'

import { useState } from 'react'

import { Spinner } from '@/components/ui/spinner.tsx'

import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/utils/redux/store.ts'
import { CodeXml, Eye, Plus, RadioTower } from 'lucide-react'
import { SeparatorLine } from '@/components/ui/separator/separator.tsx'
import AppCardForAdmin from '@/pages/homepage/app-card-for-admin.tsx'
import { setModeToggled } from '@/utils/redux/adminSlice.ts'
import { useAuthMe } from '@/utils/api/hooks/auth/use-auth-me'
import { ROUTES } from '@/consts/routes'
import { useGetServices } from '@/utils/api/hooks/services/use-get-services'
import { setIsDark } from '@/utils/redux/theme-slice'

export const AdminAppPage = () => {
  const navigate = useNavigate()

  const dispatch = useDispatch()

  const { data: appUser } = useAuthMe()

  const isToggledBefore = useSelector((state: RootState) => state.admin.adminModeToggled)
  const [isAdminModeToggled, setIsAdminModeToggled] = useState(appUser?.isAdmin && isToggledBefore)

  const { data: Allservices, isLoading } = useGetServices()

  const handleToggle = () => {
    setIsAdminModeToggled(!isAdminModeToggled)
    dispatch(setModeToggled(!isAdminModeToggled))
  }

  if (isLoading) {
    return (
      <div className='flex h-[100vh] w-[100vw] items-center justify-center'>
        <Spinner />
      </div>
    )
  }

  return (
    <div className='mx-auto w-full max-w-[600px] p-4 pb-28'>
      {Allservices && Allservices.find((app) => app.id === 1) && (
        <>
          <div className='mx-auto h-fit w-[2/3] space-y-3 rounded-t-2xl bg-[linear-gradient(180deg,_#82B1FF_0%,_#6f7aff_100%)] p-3 shadow'>
            <h1 className='mb-2 text-3xl font-bold'>Выбор редакции</h1>
          </div>
          <div className='h-fit w-[2/3] space-y-3 rounded-b-2xl bg-[linear-gradient(180deg,_rgba(111,122,255,0.6166841736694677)_100%,_#665FFF_100%)] p-3 text-white shadow'>
            <div className='flex w-full flex-row items-center justify-between overflow-hidden rounded-lg p-1'>
              <div className='ml-2 mr-5 flex w-fit flex-row items-center justify-between'>
                {Allservices.find((app) => app.id === 1)?.logo_url ? (
                  <img
                    src={Allservices.find((app) => app.id === 1)?.logo_url}
                    alt='icon'
                    className='h-12 w-12 rounded-lg object-cover'
                  />
                ) : (
                  <div className='h-16 w-16 rounded-lg bg-gray-500'></div>
                )}

                <div className='ml-4 flex flex-col'>
                  <h2 className='w-fit truncate text-lg font-semibold leading-none'>
                    {Allservices.find((app) => app.id === 1)?.name}
                  </h2>
                  <p className='max-w-45 text-md mt-1 line-clamp-2 text-white'>
                    {Allservices.find((app) => app.id === 1)?.shortcode}
                  </p>
                </div>
              </div>
              <Button
                onClick={() => {
                  navigate(`/app/${Allservices.find((app) => app.id === 1)?.id}`)
                  dispatch(setIsDark(true))
                }}
                className='dark mb-2 mt-2 h-8 w-20 rounded-2xl text-sm'
                size='sm'
              >
                Открыть
              </Button>
            </div>
          </div>
        </>
      )}
      <div>
        <h1 className='mb-1 mt-6 p-2 text-xl font-bold'>Популярно на этой неделе</h1>
        {Allservices &&
          Allservices.map((app) =>
            isAdminModeToggled ? <AppCardForAdmin app={app} key={app.id} /> : <AppCard app={app} key={app.id} />
          )}
      </div>
      <div className='mt-6 flex flex-col items-center justify-center space-y-2'>
        <SeparatorLine orientation='horizontal' />
        {appUser?.isAdmin && (
          <Button onClick={handleToggle} className='w-[100%] rounded-2xl'>
            {isAdminModeToggled ? (
              <>
                <Eye className='mr-2' /> Включить режим пользователя
              </>
            ) : (
              <>
                <CodeXml className='mr-2' />
                Включить режим админа
              </>
            )}
          </Button>
        )}
        {isAdminModeToggled && (
          <div className='flex w-[100%] flex-col items-center justify-center space-y-2'>
            <Button onClick={() => navigate('/app/create')} className='w-[100%] rounded-2xl'>
              <Plus className='mr-2' /> Создать новое приложение
            </Button>
            <Button onClick={() => navigate('/broadcast-message')} className='w-[100%] rounded-2xl'>
              <RadioTower className='mr-2' /> Создать рекламное сообщение
            </Button>
            <Button onClick={() => navigate(ROUTES.ADMIN_USERS)} className='w-[100%] rounded-2xl'>
              <RadioTower className='mr-2' /> Список пользователей
            </Button>
            <Button onClick={() => navigate(ROUTES.CITIES)} className='w-[100%] rounded-2xl'>
              <RadioTower className='mr-2' /> Города
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
