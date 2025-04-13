import { AxiosRequestConfig, DeleteParticipantParams } from '@/types/api'
import api from '@/utils/api/axios-instance.ts'

export type DeleteParticipantConfig = AxiosRequestConfig<DeleteParticipantParams>
export const deleteParticipant = ({ params, config }: DeleteParticipantConfig) =>
  api.delete(`/events/participant/${params?.id}`, config)
