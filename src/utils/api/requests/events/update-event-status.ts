import { AxiosRequestConfig, UpdateEventStatusParams } from '@/types/api'
import api from '@/utils/api/axios-instance.ts'

export type UpdateEventStatus = AxiosRequestConfig<UpdateEventStatusParams>
export const updateEventStatus = ({ params, config }: UpdateEventStatus) =>
  api.patch(`/events/${params?.id}/status`, params?.dto, config)
