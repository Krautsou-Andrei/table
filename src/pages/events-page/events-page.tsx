import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { SliderServices } from './ui/slider-services'

import { DatePicker } from '@/pages/events-page/date-picker.tsx'

import { Header } from '@/widgets/header'
import { CardEventApp } from '@/widgets/card-event-app'

import { AppLayout } from '@/components/ui/app-layout'

import { useGetEvents } from '@/utils/api/hooks/events/use-get-events'
import { RootState } from '@/utils/redux/store'
import { filterEventsFront } from './utils/filter-events-front'
import { useFetchNext } from '@/utils/hooks/useFetchNext'
import { setFilterSettings } from '@/utils/redux/filter-settings-slice'
import { useFavorites } from '@/utils/hooks/use-favorites'
import useBackButton from '@/utils/hooks/useBackButton'

import { TEXT } from '@/consts/text'
import { EventCategory } from '@/consts/event-category'

export const EventsPage = () => {
  const filterSettings = useSelector((state: RootState) => state.filterSettings)
  const dispatch = useDispatch()
  const { state } = useFavorites()

  const {
    data: allEvents,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetEvents({
    cityId: Number(filterSettings.citiId),
    date: filterSettings.date ? new Date(filterSettings.date) : null,
  })

  useEffect(() => {
    dispatch(setFilterSettings({ categoty: undefined, citiId: '1', date: null, sort: undefined }))
  }, [dispatch])

  const loadMoreRef = useFetchNext(hasNextPage, isFetchingNextPage, fetchNextPage)

  useBackButton()

  return (
    <div className='background-gradient min-h-dvh bg-background-buttonDate uppercase'>
      <Header />

      <div className='flex items-center justify-center'>
        <DatePicker numberOfDays={7} />
      </div>

      <AppLayout className='pb-[113px]'>
        <SliderServices />
        <div className='flex flex-col gap-4'>
          {allEvents?.pages && allEvents.pages.length > 0 ? (
            allEvents.pages.map((page) => {
              const filter = filterEventsFront({
                allEvents: page.data.items,
                filterSettings: filterSettings,
                favorites: state.favorites,
              })

              if (filter.length > 0) {
                return filter.map((slide) => (
                  <CardEventApp
                    id={slide.id}
                    key={slide.id}
                    title={slide.title}
                    date={slide.datetime}
                    image={slide.image}
                    users={slide.participants.length}
                    descriptions={slide.description}
                    category={slide.category as EventCategory}
                    price={slide.price}
                    currency={slide.currency}
                  />
                ))
              } else {
                return <div className='text-center font-bold uppercase'>{TEXT.EMPTY}</div>
              }
            })
          ) : (
            <div className='text-center font-bold uppercase'>{TEXT.EMPTY}</div>
          )}
          <div ref={loadMoreRef} />
        </div>
      </AppLayout>
    </div>
  )
}
