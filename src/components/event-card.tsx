import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils.ts'
import { formatDisplayedDate } from '@/utils/formatDate.ts'
import { ROUTES } from '@/consts/routes'

export interface EventCardProps {
  id: number
  title: string
  image: string
  price: number
  currency: '₺' | '₽' | '$'
  datetime: string
}

function EventCard({ id, title, image, price, datetime, currency }: EventCardProps) {
  return (
    <Link to={`${ROUTES.ADMIN_EVENTS}/${id}`} className='group relative cursor-pointer space-y-2' key={id}>
      <div className='relative aspect-[3/2] overflow-hidden rounded-lg'>
        <img src={image} alt={title} className='h-full w-full object-cover' />
        <div className='absolute bottom-2 left-2 flex gap-2'>
          <div
            className={cn('rounded px-2 py-1 text-sm font-medium', !price ? 'bg-green-500 text-white' : 'bg-gray-600 text-white')}
          >
            {price ? `${price} ${currency}` : 'Бесплатно'}
          </div>
        </div>
      </div>
      <div>
        <h3 className='text-xl font-medium text-white'>{title}</h3>
        <p className='text-sm text-muted-foreground'>{formatDisplayedDate(datetime)}</p>
      </div>
    </Link>
  )
}

export default EventCard
