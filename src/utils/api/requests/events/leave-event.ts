import { AxiosRequestConfig, LeaveEventParams, Participation } from '@/types/api'
import api from '@/utils/api/axios-instance.ts'

export type LeaveEventConfig = AxiosRequestConfig<LeaveEventParams>
export const leaveEvent = ({ params, config }: LeaveEventConfig) =>
  api.delete<Participation>(`/events/${params?.id}/leave`, config)
