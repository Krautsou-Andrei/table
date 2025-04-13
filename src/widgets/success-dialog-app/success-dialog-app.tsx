import { useNavigate } from 'react-router-dom'

import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

import { Button } from '@/components/ui/button'

import { TEXT } from '@/consts/text'

import { X } from 'lucide-react'
import successImage from '@/assets/imgs/success_dialog.png'
import { ROUTES } from '@/consts/routes'

interface SuccessDialogApp {
  conut?: number
  isOpen: boolean
  onOpenChange: () => void
  title: string
  subTitle?: string
  isConfirm?: boolean
}

export const SuccessDialogApp = ({ isOpen, onOpenChange, title, isConfirm }: SuccessDialogApp) => {
  const navigate = useNavigate()
  return (
    <>
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className='w-[95%]'>
          <DialogHeader>
            <div className='mb-[10px] flex w-full justify-end'>
              <DialogClose className='shadow-none focus:shadow-none focus:outline-none' style={{ boxShadow: 'none' }}>
                <X className='h-6 w-6' />
                <span className='sr-only'>Close</span>
              </DialogClose>
            </div>
            <DialogTitle>{title}</DialogTitle>
            {/* <DialogDescription>
              <span className='flex items-center justify-center gap-2'>
                {subTitle}{' '}
                <span className='flex items-center gap-1'>
                  {conut}
                  <AppIcon name='icon/thumbs-up' width={16} height={16} />
                </span>
              </span>
            </DialogDescription> */}
          </DialogHeader>
          <div className='flex flex-col items-center justify-center gap-2'>
            <img src={successImage} alt='' width={282} height={352} />
            {isConfirm && (
              <>
                <Button onClick={() => navigate(ROUTES.PROFILE)}>{TEXT.GO_PROFILE}</Button>
                <p className='text-center text-[10px] uppercase'>{TEXT.EVENT_SUCCESS_DESCRIPRION}</p>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
