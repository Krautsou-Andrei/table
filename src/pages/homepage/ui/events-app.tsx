import { Swiper, SwiperSlide } from 'swiper/react'

import { useHomeEvents } from '../hooks/use-home-events'
import { SliderCardApp } from './slider-card-app'

import { TEXT } from '@/consts/text'

import 'swiper/css'
import { EventCategory } from '@/consts/event-category'

export const EventsApp = () => {
  const { state } = useHomeEvents()

  const SLIDES = state.allEvents?.pages

  return (
    <>
      <h2 className='mb-2 text-xl font-bold uppercase leading-[122%]'>{TEXT.EVENTS} Каше</h2>
      <div className='min-h-[196px]'>
        {SLIDES && SLIDES.length > 0 && state.isNotFinishedAll ? (
          <Swiper slidesPerView={1.3} spaceBetween={16} autoplay={{ delay: 3000 }}>
            {SLIDES.map((page) =>
              page.data.items.map((slide) => (
                <SwiperSlide key={slide.title}>
                  <SliderCardApp
                    id={String(slide.id)}
                    category={slide.category as EventCategory}
                    currency={slide.currency}
                    date={slide.createdAt}
                    image={slide.image}
                    title={slide.title}
                    price={slide.price}
                    users={slide.participants.length}
                  />
                </SwiperSlide>
              ))
            )}
          </Swiper>
        ) : (
          <div className='flex min-h-[inherit] items-center justify-center font-bold uppercase leading-[122%]'>
            {TEXT.EMPTY}
          </div>
        )}
      </div>
    </>
  )
}
