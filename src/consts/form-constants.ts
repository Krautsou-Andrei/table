import { EventCategory } from '@/consts/event-category'

export const CURRENCY = [
  { id: 1, value: '₺' },
  { id: 2, value: '₽' },
  { id: 3, value: '$' },
]

export const eventCategories = [
  { value: EventCategory.NOT_CATEGORY, title: 'Без категории' },
  { value: EventCategory.CITY, title: 'Город' },
  { value: EventCategory.BIRTHDAY, title: 'День рождения' },
  { value: EventCategory.SUNSET, title: 'Закат' },
  { value: EventCategory.YOGA, title: 'Йога' },
  { value: EventCategory.HOUSE_CONCERT, title: 'Квартирник' },
  { value: EventCategory.QUIZ, title: 'Квиз' },
  { value: EventCategory.CONCERT, title: 'Концерт' },
  { value: EventCategory.CULTURE, title: 'Культура' },
  { value: EventCategory.BOARD_GAMES, title: 'Настолки' },
  { value: EventCategory.CLUB, title: 'Ночной клуб' },
  { value: EventCategory.MASSAGE, title: 'Массаж' },
  { value: EventCategory.MAFIA, title: 'Мафия' },
  { value: EventCategory.MUSICAL_JAM, title: 'Музыкальный джем' },
  { value: EventCategory.HANGOUT, title: 'Отдых' },
  { value: EventCategory.SWIMMING, title: 'Плавание' },
  { value: EventCategory.TRIP, title: 'Поездка' },
  { value: EventCategory.GET_TOGETHERS, title: 'Посиделки' },
  { value: EventCategory.HIKE, title: 'Поход' },
  { value: EventCategory.HOLIDAY, title: 'Праздник' },
  { value: EventCategory.WALK, title: 'Прогулка' },
  { value: EventCategory.BOAT_RIDE, title: 'Прогулка на лодке' },
  { value: EventCategory.TRAVEL, title: 'Путешествие' },
  { value: EventCategory.SUNRISE, title: 'Рассвет' },
  { value: EventCategory.RETREAT, title: 'Ретрит' },
  { value: EventCategory.SPORT, title: 'Спорт' },
  { value: EventCategory.STANDUP, title: 'Стендап' },
  { value: EventCategory.CLEANUP, title: 'Субботник' },
  { value: EventCategory.DANCES, title: 'Танцы' },
  { value: EventCategory.PARTY, title: 'Тусовка' },
  { value: EventCategory.EXCURSION, title: 'Экскурсия' },
]

export const CATEGORIES_VALUE: Record<EventCategory, string> = eventCategories.reduce(
  (acc, { value, title }) => {
    acc[value] = title
    return acc
  },
  {} as Record<EventCategory, string>
)

export const CATEGORIES = eventCategories.map((item, index) => ({
  id: index + 1,
  value: item.value,
  title: item.title,
}))
