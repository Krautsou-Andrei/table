import { Link, useNavigate } from 'react-router-dom'

import { AppIcon } from '@/components/ui/app-icon'
import { AppLayout } from '@/components/ui/app-layout'

import { useHeader } from './hooks/use-header'

import { FilterHeader } from './ui/filter-header'

import { VARIABLES } from '@/consts/variables'
import { ROUTES } from '@/consts/routes'
import { COLOR } from '@/consts/color'
import { Button } from '@/components/ui/button'

import logo from '@/assets/svg/app/logo_cat.svg'
import { FilterCityDialog } from '../flter-city-dialog'
import { useAuthMe } from '@/utils/api/hooks/auth/use-auth-me'

export const Header = () => {
  const { state, functions } = useHeader()
  const navigate = useNavigate()
  const { data: user } = useAuthMe()

  return (
    <AppLayout className='relative z-[60] rounded-b-2xl bg-[var(--backgroundHeader)]'>
      <>
        <div className='relative pb-5 pt-2'>
          <div className='mb-8 flex h-[17px] items-center justify-between px-4'></div>
          <div className='flex w-full items-center justify-between'>
            <div className='flex items-center gap-2 text-text-secondary'>
              <Link to={ROUTES.INSTRUCTIONS}>
                <AppIcon name='app/thumbs-up' />
                <div className='text-center'>{state.user?.starsBalance || 0}</div>
              </Link>
            </div>
            <h1 className='relative flex items-center'>
              <div className='text-[29px] font-bold leading-[115%]'>{VARIABLES.LOGO}</div>{' '}
              <div className='pt-1 font-pressStart text-[22px] leading-none text-text-secondary'>
                {VARIABLES.LOGO_PREFIX}
              </div>
              <div className='mt-2'>
                <AppIcon name='app/o' width={20} height={29} />
              </div>
              <img className='absolute right-[-14px]' src={logo} alt='' width={41} height={36} />
            </h1>
            <Button variant={'fit'} size={'fit'} onClick={functions.handleIsOpenSelectCity}>
              <div className='flex items-center gap-2 rounded-2xl bg-[var(--backgroundSecondary)] p-2 pl-[14px] font-bold text-text-secondary'>
                <div className=''>{state.currentCity?.name || ''}</div>
                <AppIcon name='app/location' width={16} height={16} />
              </div>
            </Button>
          </div>
          {user?.isAdmin && (
            <div className='fixed right-4 top-4'>
              <Button
                className='box-shadow-articles cursor-pointer rounded-2xl bg-transparent p-0 text-text-secondary'
                variant={'fit'}
                value={'fit'}
                onClick={(event) => {
                  event.preventDefault()
                  event.stopPropagation()
                  navigate(`${ROUTES.ADMIN}`)
                }}
              >
                <AppIcon name='icon/admin' className='cursor-pointer' color={COLOR.SALMON} />
              </Button>
            </div>
          )}
        </div>
        {state.isEventPage && <FilterHeader />}
        <FilterCityDialog
          isOpen={state.isOpenSelectCity}
          onOpenChange={functions.handleIsOpenSelectCity}
          title={'местоположение'}
        />
      </>
    </AppLayout>
  )
}
