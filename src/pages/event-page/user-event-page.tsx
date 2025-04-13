import { Button } from '@/components/ui/button.tsx'

import { formatDate } from '@/utils/formatDate.ts'

import { EventCategory } from '@/types/api'

import { AppIcon } from '@/components/ui/app-icon'
import { AppLayout } from '@/components/ui/app-layout'
import { COLOR } from '@/consts/color'
import { CATEGORIES_VALUE } from '@/consts/form-constants'
import { TEXT } from '@/consts/text'
import { useFavorites } from '@/utils/hooks/use-favorites'
import { Header } from '@/widgets/header'
import { SuccessDialogApp } from '@/widgets/success-dialog-app'
import { useEventPage } from './hooks/use-event-page'

import { useAuthMe } from '@/utils/api/hooks/auth/use-auth-me'

import kat from '@/assets/imgs/cat_serach.png'
import { Link, useNavigate } from 'react-router-dom'
import { ROUTES } from '@/consts/routes'
import { useGetUser } from '@/utils/api/hooks/user/use-get-user'
import { ListUsersDialog } from '@/widgets/list-users-dialog'

function UserEventPage() {
  const { state, functions } = useEventPage()
  const { state: stateFavorites, functions: functionsFavorites } = useFavorites()
  const { data: user } = useAuthMe()
  const { data: userOrganizer } = useGetUser(
    { userId: state.event?.data.organizerId! },
    Boolean(state.event?.data.organizerId!)
  )
  const navigate = useNavigate()

  return (
    <>
      <div className='min-h-dvh bg-[var(--backgroundHeader)]'>
        <Header />
        {state.id && state.event && (
          <div
            className={`relative flex h-[300px] flex-col overflow-hidden rounded-t-2xl p-4 pb-8`}
            style={{
              backgroundImage: `url(${state.isImage ? state.event.data.image : kat})`,
              backgroundPosition: 'left center',
              backgroundSize: `${state.isImage ? 'cover' : ''}`,
              backgroundRepeat: 'no-repeat',
            }}
          >
            <div className='background-gradient-event absolute left-0 top-0 h-full w-full' />
            <div className='relative z-10 flex w-full justify-between gap-4'>
              <div className='flex gap-2'>
                <div className='background-blur flex cursor-pointer items-center justify-center rounded-2xl bg-[var(--tabActive)] px-4 py-2 text-sm font-medium uppercase leading-[122%] text-text-invert transition-opacity duration-300 hover:opacity-80'>
                  {state.event.data.category
                    ? CATEGORIES_VALUE[state.event.data.category as EventCategory]
                    : TEXT.CATEGORIES}
                </div>
                <div className='justify-centerbackground-blur flex cursor-pointer items-center rounded-2xl bg-[var(--tab)] px-4 py-2 text-sm font-medium uppercase leading-[122%] text-text-invert transition-opacity duration-300 hover:opacity-80'>
                  {state.city?.name}
                </div>
              </div>
            </div>
            {!state.isImage && (
              <div className='absolute right-1 top-1/2 translate-y-1/2'>'фото нет, но активность есть)'</div>
            )}
            <div className='relative z-10 flex flex-1 flex-col justify-end'>
              <div className='text-text-invert'>
                <h2 className='mb-4 line-clamp-2 overflow-hidden text-ellipsis text-xl font-bold uppercase'>
                  {state.event.data.title}
                </h2>
                <div className='mb-4 flex gap-2 leading-[122%]'>
                  <div className='background-blur cursor-pointer rounded-2xl bg-[var(--macaroniAndCheese-60)] px-4 py-2 text-sm font-medium uppercase leading-[122%] text-text-invert transition-opacity duration-300 hover:opacity-80'>
                    {String(state.date.getUTCHours()).padStart(2, '0')} :{' '}
                    {String(state.date.getMinutes()).padStart(2, '0')}
                  </div>
                  <div className='background-blur cursor-pointer rounded-2xl bg-[var(--macaroniAndCheese-60)] px-4 py-2 text-sm font-medium uppercase leading-[122%] text-text-invert transition-opacity duration-300 hover:opacity-80'>
                    {formatDate(new Date(state.event.data.datetime))}
                  </div>
                </div>
              </div>
            </div>
            {(state.user?.id === state.event.data.organizerId || state.user?.isAdmin) &&
              !state.event?.data.isFinished && (
                <div className='absolute right-4 top-4 z-20'>
                  <Button
                    className='box-shadow-articles cursor-pointer rounded-2xl p-[13px]'
                    onClick={(event) => {
                      event.preventDefault()
                      event.stopPropagation()
                      navigate(`${ROUTES.EVENT_ID}/${state.id}/edit`)
                    }}
                  >
                    <AppIcon name='icon/edit' className='cursor-pointer' fill='white' />
                  </Button>
                </div>
              )}
          </div>
        )}
        <AppLayout className='relative -top-4 overflow-hidden rounded-t-2xl bg-[var(--backgroundHeader)] pb-[113px] pt-4'>
          {!state.event?.data.isFinished && (
            <div className='mb-8 flex items-center gap-4'>
              <Button
                className='box-shadow-articles rounded-2xl bg-transparent p-[13px] text-text-secondary'
                variant={'fit'}
                value={'fit'}
                onClick={(event) => {
                  event.preventDefault()
                  event.stopPropagation()
                  state.id && functionsFavorites.handleToggle(state.id)
                }}
              >
                {state.id && stateFavorites.favorites.includes(state.id) ? (
                  <AppIcon name='icon/heart' className='cursor-pointer' color={COLOR.SALMON} />
                ) : (
                  <AppIcon name='app/heart' className='cursor-pointer' color='red' fill='red' stroke='' />
                )}
              </Button>
              {state.event?.data.organizerId === user?.id ? (
                <Button
                  className='flex-1 overflow-hidden text-ellipsis whitespace-nowrap'
                  onClick={functions.handleFinishEvent}
                >
                  <span className='overflow-hidden text-ellipsis whitespace-nowrap'>Завершить мероприятие</span>
                </Button>
              ) : (
                <Button
                  className='flex-1 overflow-hidden text-ellipsis whitespace-nowrap'
                  onClick={functions.handleChangeOpenSuccess}
                >
                  {state.isActive ? (
                    <span className='overflow-hidden text-ellipsis whitespace-nowrap'> Покинуть мероприятие</span>
                  ) : (
                    <span className='overflow-hidden text-ellipsis whitespace-nowrap'>
                      Участвовать за {`${state.event?.data.price} ${state.event?.data.currency}`}
                    </span>
                  )}
                </Button>
              )}

              <Button
                className='p-0'
                variant={'fit'}
                value={'fit'}
                onClick={() => {
                  user?.isAdmin || user?.id === state.event?.data.organizerId ? functions.handleOpenListUsers() : ''
                }}
              >
                <div className='flex items-center gap-1 text-text-secondary'>
                  <AppIcon name='icon/users' />
                  <div className=''>{state.event?.data.participants.length}+</div>
                </div>
              </Button>
            </div>
          )}

          <div className='mb-8'>
            <h3 className='mb-2 text-sm font-bold uppercase leading-[122%]'>{TEXT.DESCRIPTIONS}</h3>
            <p className='uppercase'>{state.event?.data.description}</p>
          </div>
          <div className=''>
            <h3 className='mb-3 text-sm font-bold uppercase leading-[122%]'>{TEXT.USEFUL_LINKS}</h3>
            <div className='flex flex-col gap-4'>
              {state.event?.data.location && (
                <Link to={state.event?.data.location}>
                  <div className='mb-2 text-[10px] uppercase leading-[140%]'> {'googlemaps'}</div>
                  <div className='rounded-2xl bg-[var(--backgroundSecondary)] px-4 py-2 uppercase'>
                    {state.event?.data.location}{' '}
                  </div>
                </Link>
              )}
              {state.event?.data.url && (
                <Link to={state.event?.data.url}>
                  <div className='mb-2 text-[10px] uppercase leading-[140%]'> {'обсуждение'}</div>
                  <div className='rounded-2xl bg-[var(--backgroundSecondary)] px-4 py-2 uppercase'>
                    {state.event?.data.url}{' '}
                  </div>
                </Link>
              )}
              {userOrganizer?.username && (
                <Link to={`https://t.me/${userOrganizer.username}`}>
                  <div className='mb-2 text-[10px] uppercase leading-[140%]'> {'организатор'}</div>
                  <div className='rounded-2xl bg-[var(--backgroundSecondary)] px-4 py-2 uppercase'>
                    {`https://t.me/${userOrganizer.username}`}{' '}
                  </div>
                </Link>
              )}
            </div>
          </div>
        </AppLayout>
        <SuccessDialogApp
          title={TEXT.PARCIPATION_CONFIRMED}
          subTitle={TEXT.YOU_CREDITED}
          conut={1}
          isOpen={state.isOpenSuccess}
          onOpenChange={functions.handleChangeOpenSuccess}
          isConfirm={true}
        />
        <ListUsersDialog
          title={TEXT.LIST_USERS}
          isOpen={state.isOpenListUsers}
          onOpenChange={functions.handleOpenListUsers}
        />
      </div>
    </>
  )
}

export default UserEventPage
