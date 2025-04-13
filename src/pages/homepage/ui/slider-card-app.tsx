import { HTMLAttributes, useState } from 'react'
import { Link } from 'react-router-dom'

import { AppIcon } from '@/components/ui/app-icon'

import { formatDateDots } from '@/utils/formatDate'
import { useFavorites } from '@/utils/hooks/use-favorites'

import { EmptyImage } from '@/widgets/empty-image/empty-image'
import { Button } from '@/components/ui/button'

import { EventCategory } from '@/consts/event-category'
import { CATEGORIES_VALUE } from '@/consts/form-constants'
import { ROUTES } from '@/consts/routes'
import { TEXT } from '@/consts/text'
import { COLOR } from '@/consts/color'

interface SliderCardAppProps extends HTMLAttributes<HTMLDivElement> {
  category: EventCategory
  currency: '₺' | '₽' | '$'
  title: string
  image: string
  date: string
  price: number
  users: number
}

export const SliderCardApp = ({
  id,
  category,
  currency,
  title,
  image,
  date,
  price,
  users,
  className,
  ...props
}: SliderCardAppProps) => {
  const { state, functions } = useFavorites()
  const [isImage, setIsImage] = useState(true)

  return (
    <Link to={`${ROUTES.EVENT_ID}/${id}`}>
      <div className={`relative ${className}`} {...props}>
        {isImage ? (
          <img
            className='mb-2 aspect-[295/157] h-full min-h-[157px] w-full rounded-2xl bg-[var(--backgroundHeader)] object-cover'
            src={image}
            alt=''
            loading={'lazy'}
            onError={(e) => {
              e.currentTarget.style.display = 'none'
              setIsImage(false)
            }}
          />
        ) : (
          <div className='mb-2'>
            <EmptyImage />
          </div>
        )}
        <div className='absolute left-0 top-4 flex w-full justify-between gap-4 px-4'>
          <div className='flex gap-4'>
            <div className='background-blur flex cursor-pointer items-center justify-center rounded-2xl bg-[var(--tabActive)] px-4 py-2 text-[10px] font-medium uppercase text-text-invert transition-opacity duration-300 hover:opacity-80'>
              {price ? `${price} ${currency}` : TEXT.FREE}
            </div>
            <div className='background-blur flex cursor-pointer items-center justify-center rounded-2xl bg-[var(--tab)] px-4 py-2 text-[10px] font-medium uppercase text-text-invert transition-opacity duration-300 hover:opacity-80'>
              {category ? CATEGORIES_VALUE[category] : TEXT.CATEGORIES}
            </div>
          </div>
          <Button
            variant={'fit'}
            size={'fit'}
            onClick={(event) => {
              event.preventDefault()
              event.stopPropagation()
              id && functions.handleToggle(id)
            }}
          >
            {id && state.favorites.includes(id) ? (
              <AppIcon name='icon/heart' className='cursor-pointer' color={COLOR.SALMON} />
            ) : (
              <AppIcon name='app/heart' className='cursor-pointer' color='red' fill='red' stroke='' />
            )}
          </Button>
        </div>
        <div className='flex justify-between text-[10px] leading-[140%]'>
          <div className=''>{formatDateDots(new Date(date))}</div>
          <div className='flex items-center gap-1'>
            <AppIcon name='icon/users' width={12} height={12} />
            <div className=''>+{users}</div>
          </div>
        </div>
        <p className='font-bold uppercase'>{title}</p>
      </div>
    </Link>
  )
}
