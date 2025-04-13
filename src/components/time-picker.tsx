import React, { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface TimePickerProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
}

const TimePicker = forwardRef<HTMLInputElement, TimePickerProps>(({ className, ...props }, ref) => {
  return (
    <div className='relative inline-block'>
      <input
        type='time'
        ref={ref}
        className={cn(
          'block w-full rounded-md border border-gray-300 bg-white px-3 py-2 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100',
          className
        )}
        {...props}
      />
    </div>
  )
})

TimePicker.displayName = 'TimePicker'

export default TimePicker
