import { AxiosRequestConfig, CityEvent, SendAllMessage } from '@/types/api'
import api from '@/utils/api/axios-instance-core'

export type SendMessageConfig = AxiosRequestConfig<SendAllMessage>
export const sendAllMessage = ({ params, config }: SendMessageConfig) => {
  return api.post<CityEvent>(`/message/send-to-all/${params?.id}`, params?.dto, config)
}
