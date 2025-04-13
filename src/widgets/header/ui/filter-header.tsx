import { useFilterHeader } from './hooks/use-filter-header'
import { SettingsHeader } from './settings-header'

import { AppIcon } from '@/components/ui/app-icon'
import { Button } from '@/components/ui/button'

import { TEXT } from '@/consts/text'

export const FilterHeader = () => {
  const { state, functions } = useFilterHeader()

  return (
    <div className='pb-5'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-4'>
          <Button variant={'fit'} size={'fit'} onClick={functions.handleGoHome}>
            <AppIcon name='icon/arrow-right' width={24} height={24} />
          </Button>
          <h2 className='text-xl font-bold uppercase leading-[122%]'>{TEXT.EVENTS}</h2>
        </div>
        <div className='flex items-center gap-2 text-text-third'>
          <Button
            className='h-10 w-10'
            variant={'fit'}
            size={'fit'}
            onClick={() => {
              functions.setIsOpenSettings((prev) => !prev)
              functions.setIsOpenSearch(false)
            }}
          >
            <AppIcon name='icon/filter' width={40} height={24} />
          </Button>
        </div>
      </div>

      <SettingsHeader isOpen={state.isOpenSettings} />
    </div>
  )
}
