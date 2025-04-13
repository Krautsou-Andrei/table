import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

interface CalendarPopupAppProps {
  isOpen: boolean
  onOpenChange: () => void
  handleSetDate?: (date?: Date) => void
  isCreatePage?: boolean
}

export const CalendarPopupApp = ({ isOpen, onOpenChange, handleSetDate, isCreatePage }: CalendarPopupAppProps) => {
  return (
    <Popover open={isOpen} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <button className='relative left-1/2 h-[34px] -translate-x-1/2'>
          <div className='h-[2px] w-20 bg-foreground'></div>
        </button>
      </PopoverTrigger>
      <PopoverContent
        className={cn(
          'relative w-auto rounded-b-2xl bg-background-secondary p-0',
          isOpen && isCreatePage ? '-top-[46px]' : ''
        )}
        align='start'
      >
        <Calendar
          className='pb-0'
          mode='single'
          onSelect={(data) => {
            if (data) {
              const curentDate = new Date(data)
              handleSetDate && handleSetDate(curentDate)
            }
            onOpenChange()
          }}
        />

        <button className='relative left-1/2 h-[34px] -translate-x-1/2' onClick={onOpenChange}>
          <div className='h-[2px] w-20 bg-foreground'></div>
        </button>
      </PopoverContent>
    </Popover>
  )
}
