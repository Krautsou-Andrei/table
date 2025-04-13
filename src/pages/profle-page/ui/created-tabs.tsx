import { CardEventApp } from '@/widgets/card-event-app'

import { TEXT } from '@/consts/text'

import { useGetOrganizedEvents } from '@/utils/api/hooks/events/use-get-organized-events'

import { EventCategory } from '@/types/api'

export const CreatedTabs = () => {
  const { data: events } = useGetOrganizedEvents()
 
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
