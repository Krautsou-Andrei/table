import { CardEventApp } from '@/widgets/card-event-app'

import { useGetUserEvents } from '@/utils/api/hooks/events/use-get-user-events'

import { TEXT } from '@/consts/text'
import { EventCategory } from '@/consts/event-category'

export const IGoTabs = () => {
  const { data: events } = useGetUserEvents()

  return (
    <div className='flex flex-col gap-4 pb-28'>
      {events && events.length > 0 ? (
        events.map((slide) => (
          <CardEventApp
            id={slide.id}
            key={slide.id}
            title={slide.title}
            date={slide.datetime}
            image={slide.image}
            users={slide?.participants?.length}
            descriptions={slide.description}
            category={slide.category as EventCategory}
            currency={slide.currency}
            price={slide.price}
          />
        ))
      ) : (
        <div className='text-center font-bold uppercase leading-[122%]'>{TEXT.EMPTY}</div>
      )}
    </div>
  )
}
