import { AxiosRequestConfig, UpdateParticipantStatusParams } from '@/types/api'
import api from '@/utils/api/axios-instance.ts'

export type UpdateParticipantStatusConfig = AxiosRequestConfig<UpdateParticipantStatusParams>
export const updateParticipantStatus = ({ params, config }: UpdateParticipantStatusConfig) =>
  api.patch(`/events/${params?.id}/participants/status`, params?.DTO, config)
