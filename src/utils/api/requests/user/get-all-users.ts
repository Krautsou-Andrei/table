import { AxiosRequestConfig, GetUsersParams, GetUsersResponse } from '@/types/api'
import api from '@/utils/api/axios-instance-core.ts'

export type GetAllUsers = AxiosRequestConfig<GetUsersParams>
export const getAllUsers = ({ params, config }: GetAllUsers) => {
  const queryParams = new URLSearchParams()

  if (params?.username) {
    queryParams.append('username', params.username)
  }

  if (params?.page) {
    queryParams.append('page', params.page.toString())
  }

  if (params?.limit) {
    queryParams.append('limit', params.limit.toString())
  }

  if (params?.offset) {
    queryParams.append('offset', params.offset.toString())
  }

  return api.get<GetUsersResponse>(`/user?${queryParams.toString()}`, config)
}
