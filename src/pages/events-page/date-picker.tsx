import { cn } from '@/lib/utils.ts'

import { format } from 'date-fns'
import { ru } from 'date-fns/locale'

import { useDatePicker } from './hooks/use-date-picker'

import { CalendarPopupApp } from '@/widgets/calendar-popup-app'

import { AppLayout } from '@/components/ui/app-layout'

interface DatePickerProps {
  numberOfDays: number
}

export function DatePicker({ numberOfDays }: DatePickerProps) {
  const { state, functions } = useDatePicker({ numberOfDays: numberOfDays })

  return (
    <AppLayout
      className={`relative z-0 w-full rounded-b-2xl bg-[var(--backgroundDatePicker)] ${state.isOpenCalendar ? '-top-[156px]' : '-top-4'}`}
    >
      <div className='hide-horizontal-scrollbar flex w-full gap-[2px] overflow-x-auto pt-4'>
        {state.dates.map((date, index) => {
          const isSelected = index === state.todayIndex
          const isWeekend = date.getDay() === 0 || date.getDay() === 6

          return (
            <button
              key={date.toISOString()}
              onClick={() => {
                console.log('dsfsdfsdf', date)
                functions.setSelectedDate(() => date)
              }}
              className={cn(
                'flex h-[82px] flex-1 flex-col items-center gap-2 rounded-b-2xl bg-background-buttonDate py-4 text-sm transition-colors',
                isSelected && 'bg-background-button',
                !isSelected && 'hover:bg-muted'
              )}
            >
              <span
                className={cn(
                  'text-[10px] leading-[140%]',
                  isWeekend && 'text-red-500',
                  isSelected && 'text-primary-foreground'
                )}
              >
                {format(date, 'eeeeee', { locale: ru }).toUpperCase()}
              </span>
              <span className={cn('text-xl font-bold', isSelected && 'text-primary-foreground')}>
                {format(date, 'd')}
              </span>
            </button>
          )
        })}
      </div>

      <CalendarPopupApp
        isOpen={state.isOpenCalendar}
        onOpenChange={functions.handleTriggerCalendar}
        handleSetDate={functions.handleSetDate}
      />
    </AppLayout>
  )
}
