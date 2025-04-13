import { AxiosRequestConfig, GetLeaderParams, Leader } from '@/types/api'
import api from '../../axios-instance'

export type GetLeadersGonfig = AxiosRequestConfig<GetLeaderParams>
export const getLeaders = ({ config }: GetLeadersGonfig) => {
  return api.get<Leader[]>(`/api/all_leaders `, config)
}
