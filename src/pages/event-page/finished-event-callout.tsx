import { Card, CardContent } from '@/components/ui/card'
import { CalendarCheck2, X } from 'lucide-react'
import { useState } from 'react'

function FinishedEventCallout() {
  const [isCalloutVisible, setIsCalloutVisible] = useState(true)

  if (isCalloutVisible) {
    return (
      <Card className='relative m-4 max-w-2xl overflow-hidden pr-4'>
        <button className='absolute right-2 top-2' onClick={() => setIsCalloutVisible(false)}>
          <X className='h-4 w-4' />
        </button>
        <CardContent className='flex h-full items-center p-4'>
          <div className='mr-4 flex-shrink-0'>
            <CalendarCheck2 className='h-10 w-10 text-green-700' />
          </div>
          <div className='flex-grow overflow-hidden'>
            <p className='line-clamp-3 text-sm text-muted-foreground'>Мероприятие завершено!</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return null
}

export default FinishedEventCallout
