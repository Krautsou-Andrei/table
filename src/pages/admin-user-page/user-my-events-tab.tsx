import EventCard from '@/components/event-card.tsx'
import { CityEvent } from '@/types/api'

export interface UserMyEventsTabProps {
  events: CityEvent[]
  userId: number | undefined
}

function UserMyEventsTab({ events, userId }: UserMyEventsTabProps) {
  const myEvents = events.filter(
    (event) => !event.isFinished && event.participants.find((participant) => participant.userId === userId)
  )

  return (
    <div className='flex flex-col gap-6'>
      {myEvents.map((event) => (
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

export default UserMyEventsTab
