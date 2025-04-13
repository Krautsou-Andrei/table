import { PropsWithChildren } from 'react'
import { useInitData } from '@vkruglikov/react-telegram-web-app'

import { useLogin } from '@/utils/api/hooks/auth/use-login'

export function ProtectedRoute({ children }: PropsWithChildren) {
  const [_initDataUnsafe, initData] = useInitData()

  const { data } = useLogin(initData)

  console.log(data)

  return children
}
