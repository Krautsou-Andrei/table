export type AxiosRequestConfig<Params = undefined> = Params extends undefined
  ? { config?: import('axios').AxiosRequestConfig }
  : {
      params?: Params
      config?: import('axios').AxiosRequestConfig
    }

export type RequestConfig<Params = undefined> = Params extends undefined
  ? { config?: ApiRequestConfig }
  : { params: Params; config?: ApiRequestConfig }

export interface PaginationParams {
  page?: number
  limit?: number
  offset?: number
}

export interface GetLeaderParams {
  id: number
  username: string
  score: number
  place: number
}

export interface Leader {
  id: number
  username: string
  telegramId: string
  score: number
  place: number
}

export interface PaginationMeta {
  total: number
  totalPages: number
  page: number
  limit: number
  offset: number
  hasNextPage: boolean
  hasPrevPage: boolean
  nextPage: number
  prevPage: null
}

export interface ApplicationDTO {
  id: number
  name: string
  description: string
  icon: string
  screenshots: string[]
  category: string
  orderNumber?: number
  createdAt: string
  updatedAt: string
  url: string
  shortDescription: string
}

export interface PatchApplicationDto {
  name: string
  description: string
  icon: string
  screenshots: string[]
  category: string
  orderNumber?: number
  url: string
  shortDescription: string
}

export interface PatchServiceDto {
  name: string
  shortcode: string
  description: string
  url: string
  screenshots: string[]
  logo_url: string
}

export interface CreateServiceDto {
  name: string
  shortcode: string
  description: string
  screenshots: string[]
  url: string
  logo_url: string
}

export interface CreateApplicationDto {
  name: string
  description: string
  icon: string
  screenshots: string[]
  category: string
  orderNumber?: number
  url: string
  shortDescription: string
}

export interface MakeApplicationMainParams {
  applicationId: number
}

export interface PatchApplicationParams {
  dto: PatchApplicationDto
  applicationId: number
}

export interface PatchServiceParams {
  dto: PatchServiceDto
  serviceId: number
}

export interface GetApplicationParam {
  applicationId: number
}

export interface DeleteApplicationParam {
  applicationId: number
}

export interface LoginPayload {
  initData: { initData: string }
}

export interface LoginResponseData {
  token: string
  user: User
}

export interface User {
  id: number
  telegramId: string
  username: string
  isAdmin: boolean
  createdAt: string
  isBanned: boolean
  starsBalance: number
}

export interface GetUsersParams extends PaginationParams {
  username?: string
}

export interface GetUsersByIds {
  userIds: string
}

export interface GetUsersResponse {
  items: User[]
  meta: PaginationMeta
}

export interface CreateBroadcastMessageDTO {
  text: string
  imageUrl: string | null
}

export interface GetEventsParams extends PaginationParams {
  cityId?: number
  date?: Date | null
  isFinished?: boolean
  userId?: number
  page?: number
  limit?: number
  offset?: number
}

export interface GetEventsResponse {
  items: CityEvent[]
  meta: PaginationMeta
}

export interface GetEventParams {
  id: string
}

export interface GetServiceParams {
  id: string
}

export interface CityEvent {
  id: number
  organizerId: number
  isFinished: false
  image: string
  title: string
  description: string
  datetime: string
  cityId: number
  location: string
  url: string
  category: string
  createdAt: string
  updatedAt: string
  organizer: User
  participants: Participant[]
  price: number
  currency: '₺' | '₽' | '$'
}

export interface City {
  id: number
  name: string
  chats: string[]
  services: Service[]
  createdAt: string
  updatedAt: string
}

export interface Message {
  id: number
  title: string
}

export interface Service {
  id: number
  name: string
  shortcode: string
  description: string
  screenshots: string[]
  url: string
  logo_url: string
}

export interface Participant {
  id: number
  userId: number
  eventId: number
  status: string
  createdAt: string
  user: User
}

export enum EventCategory {
  NOT_CATEGORY = 'OTHER',
  SPORT = 'SPORT',
  HANGOUT = 'HANGOUT',
  CULTURE = 'CULTURE',
  BOARD_GAMES = 'BOARD_GAMES',
  MAFIA = 'MAFIA',
  SWIMMING = 'SWIMMING',
  YOGA = 'YOGA',
  RETREAT = 'RETREAT',
  QUIZ = 'QUIZ',
  TRAVEL = 'TRAVEL',
  HIKE = 'HIKE',
  WALK = 'WALK',
  MASSAGE = 'MASSAGE',
  DANCES = 'DANCES',
  TRIP = 'TRIP',
  CITY = 'CITY',
  CLUB = 'CLUB',
  PARTY = 'PARTY',
  BIRTHDAY = 'BIRTHDAY',
  HOLIDAY = 'HOLIDAY',
  CLEANUP = 'CLEANUP',
  SUNSET = 'SUNSET',
  EXCURSION = 'EXCURSION',
  SUNRISE = 'SUNRISE',
  BOAT_RIDE = 'BOAT_RIDE',
  CONCERT = 'CONCERT',
  STANDUP = 'STANDUP',
  HOUSE_CONCERT = 'HOUSE_CONCERT',
  MUSICAL_JAM = 'MUSICAL_JAM',
  GET_TOGETHERS = 'GET_TOGETHERS',
}

export interface CreateEventDTO {
  title: string
  description: string
  image: string
  datetime: string
  cityId: number
  location: string
  price: number
  url: string
  category: EventCategory
  currency: '₺' | '₽' | '$'
}

export interface EditEventDTO {
  title: string
  description: string
  image?: string
  datetime: string
  cityId: number
  location: string
  price: number
  url: string
  category: EventCategory
  currency: '₺' | '₽' | '$'
}

export interface SendAllMessageDto {
  buttons: {
    inline_keyboard: [
      [
        {
          text: string
          url: string
        },
      ],
    ]
  }
}

export interface SendAllMessage {
  id: string
  dto: sendAllMessageDto
}

export interface EditEventParams {
  DTO: EditEventDTO
  id: string
}

export interface DeleteEventParams {
  id: string
}

export interface FinishEventParams {
  id: string
}

export interface JoinEventParams {
  id: string
}

export interface Participation {
  id: number
  userId: number
  eventId: number
  status: string
  createdAt: string
}

export interface LeaveEventParams {
  id: string
}

export enum ParticipantStatus {
  JOINED = 'JOINED',
  PARTICIPATED = 'PARTICIPATED',
}

export interface ChangeStatusParticipant {
  userId: number
  status: ParticipantStatus
}

export interface UpdateParticipantStatusDTO {
  participants: ChangeStatusParticipant[]
}

export interface UpdateParticipantStatusParams {
  id: string
  DTO: UpdateParticipantStatusDTO
}

export interface GetEventParticipantsParams {
  id: string
}

export interface UpdateEventStatusDTO {
  isFinished: boolean
}

export interface UpdateEventStatusParams {
  id: string
  dto: UpdateEventStatusDTO
}

export interface DeleteParticipantParams {
  id: string
}

export interface AddCityParams {
  name: string
}

export interface GetCityParams {
  id: string
}

export interface UpdateCityDTO {
  name: string
  chats: string[]
}

export interface UpdateCityParams {
  id: string
  dto: UpdateCityDTO
}

export interface DeleteCityParams {
  id: string
}

export interface UpdateBalanceDTO {
  balance: number
}

export interface UpdateBalanceParams {
  userId: number
  dto: UpdateBalanceDTO
}

export interface GetUserParams {
  userId: number
}

export interface BanUserParams {
  username: string
}

export interface UnbanUserParams {
  username: string
}

export type LoginResponse = AxiosResponse<LoginResponseData>
