import { useState } from 'react'

import { Button } from '@/components/ui/button.tsx'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog.tsx'

import { Toaster } from 'react-hot-toast'

import useBackButton from '@/utils/hooks/useBackButton.ts'
import { useGetMessages } from '@/utils/api/hooks/messages/use-get-messages'
import { TEXT } from '@/consts/text'

import { Input } from '@/components/ui/input'

import { useSendAllMessage } from '@/utils/api/hooks/messages/use-send-all-message'

function CreateBroadcastMsgPage() {
  const [textButton, setTextButton] = useState('')
  const [linkButton, setLinkButton] = useState('')

  const { data: messages } = useGetMessages()
  const { mutateAsync: sendAllMessage } = useSendAllMessage()

  const sendMessage = (id: number) => {
    sendAllMessage({
      id: String(id),
      dto: {
        buttons: {
          inline_keyboard: [
            [
              {
                text: textButton,
                url: linkButton,
              },
            ],
          ],
        },
      },
    })
  }

  useBackButton()

  return (
    <>
      <div className='mx-auto mt-3 flex w-[95%] flex-col pb-32'>
        <div className='flex flex-row items-center'>
          <h1 className='text-2xl font-bold'>Создание рекламных сообщений</h1>
        </div>
        <div className='mt-3 flex flex-col gap-1'>
          {messages &&
            messages.data.map((message, index) => (
              <div
                className={`box-shadow-form Date group mt-0.5 flex cursor-pointer items-center bg-background-invert px-4 py-3 uppercase hover:bg-background-card hover:text-text-invert`}
                key={message.id}
              >
                <div className='min-w-[60px]'>{index + 1}</div>
                <div className='w-full'>{message.title}</div>
                <div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant={'default'}>{TEXT.OPEN}</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Создайте кнопку</AlertDialogTitle>
                        <AlertDialogDescription>
                          <div className='flex flex-col items-start gap-2'>
                            <label htmlFor='titleButton' className='font-medium text-text-invert'>
                              Название кнопки
                            </label>
                            <Input
                              id='titleButton'
                              type='text'
                              value={textButton}
                              onChange={(e) => {
                                const value = e.target.value
                                setTextButton(value)
                              }}
                            />
                          </div>
                          <div className='flex flex-col items-start gap-2'>
                            <label htmlFor='linkButton' className='font-medium text-text-invert'>
                              Ссылка
                            </label>
                            <Input
                              id='linkButton'
                              type='text'
                              value={linkButton}
                              onChange={(e) => {
                                const value = e.target.value
                                setLinkButton(value)
                              }}
                            />
                          </div>
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Отмена</AlertDialogCancel>
                        <AlertDialogAction onClick={() => sendMessage(message.id)}>{TEXT.SEND}</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>{' '}
                </div>
              </div>
            ))}
        </div>
      </div>
      <Toaster />
    </>
  )
}

export default CreateBroadcastMsgPage
