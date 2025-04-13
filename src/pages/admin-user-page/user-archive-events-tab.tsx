import EventCard from '@/components/event-card.tsx'
import { useQuery } from '@tanstack/react-query'
import { getEvents } from '@/utils/api/requests/events/get-events.ts'

export interface UserArchiveEventsTabProps {
  userId: number | undefined
}

function UserArchiveEventsTab({ userId }: UserArchiveEventsTabProps) {
  const { data } = useQuery({
    queryKey: ['archiveEvents', userId],
    queryFn: () => getEvents({ params: { userId: userId!, isFinished: true } }),
    select: (data) => data.data,
  })

  return (
    <div className='flex flex-col gap-6'>
      {data?.items.map((event) => (
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

export default UserArchiveEventsTab
