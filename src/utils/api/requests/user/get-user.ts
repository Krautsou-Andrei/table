import { AxiosRequestConfig, GetUserParams, User } from '@/types/api'
import api from '@/utils/api/axios-instance-core.ts'

export type GetUserConfig = AxiosRequestConfig<GetUserParams>
export const getUserById = async ({ params, config }: GetUserConfig) => api.get<User>(`/user/${params?.userId}`, config)
