import { AxiosRequestConfig, JoinEventParams, Participation } from '@/types/api'
import api from '@/utils/api/axios-instance.ts'

export type JoinEventConfig = AxiosRequestConfig<JoinEventParams>
export const joinEvent = ({ params, config }: JoinEventConfig) =>
  api.post<Participation>(`/events/${params?.id}/join`, {}, config)
