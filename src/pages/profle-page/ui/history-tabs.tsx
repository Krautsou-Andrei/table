import { CardEventApp } from '@/widgets/card-event-app'

import { TEXT } from '@/consts/text'

import { useGetEvents } from '@/utils/api/hooks/events/use-get-events'
import { useAuthMe } from '@/utils/api/hooks/auth/use-auth-me'
import { useFetchNext } from '@/utils/hooks/useFetchNext'

import { EventCategory } from '@/consts/event-category'

export const HistoryTabs = () => {
  const { data: me } = useAuthMe()

  const {
    data: events,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetEvents({ isFinished: true, userId: me?.id }, Boolean(me))

  const loadMoreRef = useFetchNext(hasNextPage, isFetchingNextPage, fetchNextPage)

  return (
    <div className='flex flex-col gap-4 pb-28'>
      {events?.pages &&
        events.pages.length > 0 &&
        events.pages.map((page) =>
          page.data.items.length > 0 ? (
            page.data.items.map((slide) => (
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
          )
        )}
      <div ref={loadMoreRef} />
    </div>
  )
}
