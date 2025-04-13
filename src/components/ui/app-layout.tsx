import { ReactNode, HTMLAttributes } from 'react'

interface AppLayoutProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export const AppLayout = ({ children, className, ...props }: AppLayoutProps) => {
  return (
    <div className={`px-4 ${className}`} {...props}>
      {children}
    </div>
  )
}
