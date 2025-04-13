import { EVENT_SORT } from '@/consts/event-sort'
import { CityEvent } from '@/types/api'
import { FilterSettingsSlice } from '@/utils/redux/filter-settings-slice'

interface FilterEventsFrontParams {
  allEvents: CityEvent[]
  favorites: string[]
  filterSettings: FilterSettingsSlice
}

export const filterEventsFront = ({ allEvents, favorites, filterSettings }: FilterEventsFrontParams) => {
  const events = allEvents

  const filteredEvents = filterSettings.categoty
    ? events.filter((item) => item.category === filterSettings.categoty)
    : events

  if (filterSettings.sort === EVENT_SORT.SORT_DATE_AT) {
    return filteredEvents.sort((a, b) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime())
  }
  if (filterSettings.sort === EVENT_SORT.SORT_UP_PRICE) {
    return filteredEvents.sort((a, b) => a.price - b.price)
  }
  if (filterSettings.sort === EVENT_SORT.SORT_DOWN_PRICE) {
    return filteredEvents.sort((a, b) => b.price - a.price)
  }
  if (filterSettings.sort === EVENT_SORT.SORT_POPULAR) {
    return filteredEvents.sort((a, b) => b.participants.length - a.participants.length)
  }
  if (filterSettings.sort === EVENT_SORT.SORT_FOVORITES) {
    return filteredEvents.filter((item) => favorites.includes(String(item.id)))
  }
  if (filterSettings.sort === EVENT_SORT.SORT_FREE_EVENTS) {
    return filteredEvents.filter((item) => item.price === 0)
  }

  return allEvents
}
