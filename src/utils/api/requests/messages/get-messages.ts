import { AxiosRequestConfig, Message } from '@/types/api'
import api from '@/utils/api/axios-instance-core.ts'

export type GetMessagesConfig = AxiosRequestConfig
export const getMessages = async ({ config }: GetMessagesConfig) => api.get<Message[]>('/message', config)

