import { AxiosRequestConfig, User } from '@/types/api'

import { addAuthorizationHeader } from '../project/project-requests'
import api from '../../axios-instance-core'

export type AuthMeConfig = AxiosRequestConfig

export const authMe = async (config?: AuthMeConfig): Promise<User> => {
  const newConfig = addAuthorizationHeader(config)
  const response = await api.get<User>('/auth/me', newConfig)

  return response.data
}
