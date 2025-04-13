import { USERS_TABLE_HEADERS } from '../constants/profile-constants'
import { useLiderBoardTabs } from '../hooks/use-lider-board-tabs'
import { CellPaws } from './cell-paws'

import { Button } from '@/components/ui/button'
import { AppIcon } from '@/components/ui/app-icon'

import { TEXT } from '@/consts/text'

import { useGetAllUsers } from '@/utils/api/hooks/user/use-get-all-users'
import { useFetchNext } from '@/utils/hooks/useFetchNext'

export const LiderBoardTabs = () => {
  const { state, functions } = useLiderBoardTabs()
  const { data: allUsers, hasNextPage, isFetchingNextPage, fetchNextPage } = useGetAllUsers({})

  const loadMoreRef = useFetchNext(hasNextPage, isFetchingNextPage, fetchNextPage)
  return (
    <div className='w-full overflow-hidden rounded-2xl pb-28'>
      <div className={'box-shadow-form flex items-center bg-background-secondary px-4 py-3 uppercase text-text-third'}>
        {USERS_TABLE_HEADERS.map((head, index) => (
          <div className={`${index === 1 ? 'w-full' : ''}${index === 0 ? 'min-w-[60px]' : ''}`} key={head.id}>
            {head.conmponent}
          </div>
        ))}
      </div>

      <div className=''>
        {allUsers?.pages &&
          allUsers.pages.length > 0 &&
          allUsers.pages.map((page) =>
            page.data.items.map((user, index) => (
              <div
                ref={(el) => (state.userRefs.current[String(user.id)] = el)}
                className={`box-shadow-form Date group mt-0.5 flex items-center px-4 py-3 uppercase hover:bg-background-card hover:text-text-invert ${user.id === state.authMe?.id ? 'bg-background-card text-text-invert' : 'bg-background-invert'}`}
                key={user.id}
              >
                <div className='min-w-[60px]'>{index + 1}</div>
                <div className='w-full'>{user.username}</div>
                <div>
                  <CellPaws
                    className='group-hover:bg-background-card group-hover:text-text-invert'
                    isActive={user.id === state.authMe?.id}
                    title={user.starsBalance.toString()}
                  />
                </div>
              </div>
            ))
          )}
        <div ref={loadMoreRef} />
      </div>
      {state.isVisible && (
        <div className='background-gradient-you pointer-events-none fixed bottom-0 left-0 h-[430px] w-full'>
          <Button
            className='pointer-events-auto absolute bottom-[92px] right-2 text-text-secondary'
            variant={'fit'}
            size={'fit'}
            onClick={functions.handleButtonClick}
          >
            <div className='relative'>
              <div className='absolute left-[17px] top-[22px] text-sm font-bold uppercase leading-[122%] text-text-invert'>
                {TEXT.YOU}
              </div>
              <AppIcon name='icon/you' width={60} height={71} />
            </div>
          </Button>
        </div>
      )}
    </div>
  )
}
