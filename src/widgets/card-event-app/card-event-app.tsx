import { HTMLAttributes, useState } from 'react'
import { Link } from 'react-router-dom'

import { EmptyImage } from '../empty-image/empty-image'

import { AppIcon } from '@/components/ui/app-icon'
import { Button } from '@/components/ui/button'

import { formatDateDots } from '@/utils/formatDate'

import { ROUTES } from '@/consts/routes'
import { TEXT } from '@/consts/text'
import { EventCategory } from '@/consts/event-category'
import { CATEGORIES_VALUE } from '@/consts/form-constants'
import { COLOR } from '@/consts/color'
import { useFavorites } from '@/utils/hooks/use-favorites'

interface CardEventAppProps extends Omit<HTMLAttributes<HTMLDivElement>, 'id'> {
  id: number
  title: string
  descriptions: string
  image: string
  date: string
  users: number
  category: EventCategory
  currency: '₺' | '₽' | '$'
  price: number
}

export const CardEventApp = ({
  id,
  title,
  image,
  date,
  users,
  descriptions,
  category,
  currency,
  price,
  className,
  ...props
}: CardEventAppProps) => {
  const { state, functions } = useFavorites()
  const [isImage, setIsImage] = useState(true)

  return (
    <Link to={`${ROUTES.EVENT_ID}/${id}`} className='group relative cursor-pointer space-y-2' key={id}>
      <div className={`relative overflow-hidden rounded-2xl bg-[var(--backgroundHeader)] ${className}`} {...props}>
        {isImage ? (
          <img
            className='aspect-[398/218] h-full min-h-[218px] w-full bg-[var(--backgroundHeader)] object-cover'
            src={image}
            alt=''
            loading={'lazy'}
            onError={(e) => {
              e.currentTarget.style.display = 'none'
              setIsImage(false)
            }}
          />
        ) : (
          <EmptyImage />
        )}

        <div className='absolute left-0 top-4 flex w-full justify-between gap-4 px-4'>
          <div className='flex gap-4'>
            <div className='background-blur cursor-pointer rounded-2xl bg-[var(--tabActive)] px-4 py-2 text-[10px] font-medium uppercase text-text-invert transition-opacity duration-300 hover:opacity-80'>
              {price ? `${price} ${currency}` : TEXT.FREE}
            </div>
            <div className='background-blur cursor-pointer rounded-2xl bg-[var(--tab)] px-4 py-2 text-[10px] font-medium uppercase text-text-invert transition-opacity duration-300 hover:opacity-80'>
              {category ? CATEGORIES_VALUE[category] : TEXT.CATEGORIES}
            </div>
          </div>
          <Button
            variant={'fit'}
            size={'fit'}
            onClick={(event) => {
              event.preventDefault()
              event.stopPropagation()
              id && functions.handleToggle(String(id))
            }}
          >
            {id && state.favorites.includes(String(id)) ? (
              <AppIcon name='icon/heart' className='cursor-pointer' color={COLOR.SALMON} />
            ) : (
              <AppIcon name='app/heart' className='cursor-pointer' color='red' fill='red' stroke='' />
            )}
          </Button>
        </div>
        <div className='bg-[var(--backgroundHeader)] px-4 py-5'>
          <div className='mb-4 flex justify-between leading-[122%] text-text-secondary'>
            <div className=''>{formatDateDots(new Date(date))}</div>
            <div className='flex items-center gap-1'>
              <AppIcon name='icon/users' width={12} height={12} />
              <div className=''>+{users}</div>
            </div>
          </div>
          <p className='mb-1 text-xl font-bold uppercase'>{title}</p>
          <p className='overflow-hidden text-ellipsis whitespace-nowrap uppercase opacity-60'>{descriptions}</p>
        </div>
      </div>
    </Link>
  )
}
