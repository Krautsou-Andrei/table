import { useQuery } from '@tanstack/react-query'
import { Skeleton } from '@/components/ui/skeleton.tsx'
import { getOrganizedEvents } from '@/utils/api/requests/events/get-organized-events.ts'
import { Button } from '@/components/ui/button.tsx'
import EventCard from '@/components/event-card.tsx'
import { useNavigate } from 'react-router-dom'

function OrganizedEventsTab() {
  const navigate = useNavigate()
  const { data: organizedEvents, isLoading } = useQuery({
    queryKey: ['organizedEvents'],
    queryFn: () => getOrganizedEvents({}),
    select: (data) => data.data,
    staleTime: 2 * 60 * 1000,
  })

  return isLoading ? (
    <Skeleton className='h-[260px] w-full rounded-l' />
  ) : (
    <div className='flex flex-col gap-6'>
      <Button className='mt-2 bg-[#DEDEDE]' onClick={() => navigate('/event/create')}>
        Создать
      </Button>
      {organizedEvents && organizedEvents.length === 0 && (
        <p className='w-full text-center italic'>Пока нет организованных мероприятий</p>
      )}
      {organizedEvents &&
        organizedEvents.map((event) => (
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

export default OrganizedEventsTab
