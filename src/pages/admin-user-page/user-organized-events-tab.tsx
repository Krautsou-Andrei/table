import EventCard from '@/components/event-card.tsx'
import { CityEvent } from '@/types/api'

export interface UserOrganizedEventsTabProps {
  events: CityEvent[]
  userId: number | undefined
}

function UserOrganizedEventsTab({ events, userId }: UserOrganizedEventsTabProps) {
  const organizedEvents = events.filter((event) => event.organizerId === userId)

  return (
    <div className='flex flex-col gap-6'>
      {organizedEvents.map((event) => (
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

export default UserOrganizedEventsTab
