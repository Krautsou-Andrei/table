import { AxiosRequestConfig, GetEventParticipantsParams, Participant } from '@/types/api'
import api from '@/utils/api/axios-instance.ts'

export type GetEventParticipantsConfig = AxiosRequestConfig<GetEventParticipantsParams>
export const getEventParticipants = ({ params, config }: GetEventParticipantsConfig) =>
  api.get<Participant[]>(`/events/${params?.id}/participants`, config)
