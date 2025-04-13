import { AxiosRequestConfig, GetUsersByIds, User } from '@/types/api'
import api from '@/utils/api/axios-instance-core.ts'

export type GetAllUsersByIds = AxiosRequestConfig<GetUsersByIds>
export const getAllUsersByIds = ({ params, config }: GetAllUsersByIds) => {
  const queryParams = new URLSearchParams()

  if (params?.userIds) {
    queryParams.append('userIds', params.userIds)
  }

  return api.get<User[]>(`/user/getAllByIds?${queryParams.toString()}`, config)
}
