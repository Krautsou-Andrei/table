import { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { AppIcon } from './ui/app-icon'
import { Button } from './ui/button'

import { ROUTES } from '@/consts/routes'

import { setIsSend } from '@/utils/redux/create-event-form-slice'

function BottomNav() {
  const dispatch = useDispatch()
  const { pathname } = useLocation()

  return (
    <nav className='fixed bottom-0 left-0 z-50 h-20 w-full rounded-t-2xl'>
      <div className='flex justify-around gap-[2px]'>
        <div className='box-shadow-articles flex flex-1 items-center justify-center rounded-t-2xl bg-[var(--backgroundHeader)]'>
          <NavItem to={ROUTES.HOME} icon={<AppIcon name='icon/home' />} isActive={pathname === ROUTES.HOME} />
        </div>
        <div className='clip-path'></div>
        {pathname === ROUTES.EVENT_CREATE || (pathname.includes('edit') && !pathname.includes('app')) ? (
          <Button
            className='box-shadow-form absolute top-[-18px] flex h-[60px] w-[60px] items-center justify-center rounded-full'
            onClick={() => {
              dispatch(setIsSend(true))
            }}
          >
            <AppIcon name='icon/check' />
          </Button>
        ) : (
          <div className='box-shadow-articles absolute top-[-18px] flex h-[60px] w-[60px] items-center justify-center rounded-full bg-[var(--backgroundHeader)]'>
            <NavItem
              to={ROUTES.EVENT_CREATE}
              icon={<AppIcon name='icon/plus' />}
              isActive={pathname === ROUTES.EVENT_CREATE}
            />
          </div>
        )}

        <div className='box-shadow-articles flex flex-1 items-center justify-center rounded-t-2xl bg-[var(--backgroundHeader)]'>
          <NavItem to={ROUTES.PROFILE} icon={<AppIcon name='icon/user' />} isActive={pathname === ROUTES.PROFILE} />
        </div>
      </div>
    </nav>
  )
}

function NavItem({ to, icon, isActive }: { to: string; icon: ReactNode; isActive: boolean }) {
  return (
    <Link to={to} className={`p-4 ${isActive ? 'text-text-secondary' : 'text-text-primary'}`}>
      {icon}
    </Link>
  )
}

export default BottomNav
