import EventCard from '@/components/event-card.tsx'
import { useQuery } from '@tanstack/react-query'
import { getMyEvents } from '@/utils/api/requests/events/get-my-events.ts'
import { Skeleton } from '@/components/ui/skeleton.tsx'

function MyEventsTab() {
  const { data: myEvents, isLoading } = useQuery({
    queryKey: ['myEvents'],
    queryFn: () => getMyEvents({}),
    select: (data) => data.data,
    staleTime: 2 * 60 * 1000,
  })

  return isLoading ? (
    <Skeleton className='h-[260px] w-full rounded-l' />
  ) : (
    <div className='flex flex-col gap-6'>
      {myEvents && myEvents.length === 0 && <p className='mt-1 w-full text-center italic'>Пока нет билетов</p>}
      {myEvents &&
        myEvents.map((event) => (
          <EventCard
            currency={event.currency}
            id={event.id}
            key={event.id}
            title={event.title}
            image={event.image}
            price={event.price}
            datetime={event.datetime}
          />
        ))}
    </div>
  )
}

export default MyEventsTab
