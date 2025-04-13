import { HTMLAttributes } from 'react'
import { AppIcon } from '@/components/ui/app-icon'

interface CellPawsProps extends HTMLAttributes<HTMLDivElement> {
  title: string
  isActive?: boolean
}

export const CellPaws = ({ title, isActive, className }: CellPawsProps) => {
  return (
    <div
      className={`flex items-center justify-end gap-2 text-sm leading-[122%] ${isActive ? 'text-text-invert' : 'text-text-third'} ${className}`}
    >
      <div className='mt-0.5'>{title}</div>
      <AppIcon name='icon/thumbs-up' />
    </div>
  )
}
