import { Button } from '@/components/ui/button.tsx'
import { FileX, Loader2, PlusCircle } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { z } from 'zod'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import * as ScrollArea from '@radix-ui/react-scroll-area'

import { PatchServiceDto, Service } from '@/types/api'
import { Spinner } from '@/components/ui/spinner.tsx'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card.tsx'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form.tsx'
import { Input } from '@/components/ui/input.tsx'
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

import { Textarea } from '@/components/ui/textarea.tsx'
import { uploadFiles } from '@/utils/api/requests/files/upload-file.ts'
import { editApplication } from '@/utils/api/requests/applications/edit-application.ts'
import toast, { Toaster } from 'react-hot-toast'
import { showErrorMessage, showSuccessMessage } from '@/utils/notify.ts'
import { API_URL } from '@/utils/api/axios-instance-core'
import useBackButton from '@/utils/hooks/useBackButton.ts'
import { useGetService } from '@/utils/api/hooks/services/use-get-service'

const EditServiceSchema = z.object({
  name: z.string().min(1, 'Введите название приложения'),
  description: z.string().min(1, 'Введите описание приложения'),
  shortcode: z.string().min(1, 'Введите краткое описание приложения'),
  url: z.string().url('Введите корректный URL приложения'),
})

type EditServiceSchema = z.infer<typeof EditServiceSchema>

function EditAppPage() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { id } = useParams()
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const iconInputRef = useRef<HTMLInputElement | null>(null)
  const [currentIcon, setCurrentIcon] = useState<string | null>(null)
  const [currentScreenshots, setCurrentScreenshots] = useState<string[]>([])
  const [indexToDelete, setIndexToDelete] = useState<number | null>(null)

  useBackButton()

  const { mutate, isPending } = useMutation({
    mutationFn: editApplication,
    onSuccess: () => {
      showSuccessMessage('Данные успешно обновлены!')
      navigate('/')
    },
    onError: () => {
      showErrorMessage('Произошла ошибка. Попробуйте повторить снова позже.')
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['application', id] })
      queryClient.invalidateQueries({ queryKey: ['applications'] })
    },
  })

  const { data, isLoading } = useGetService(id!, Boolean(id))

  const [application, setApplication] = useState<Service | null>(null)

  useEffect(() => {
    if (data) {
      setApplication(data)
    }
  }, [data])

  const form = useForm<EditServiceSchema>({
    resolver: zodResolver(EditServiceSchema),
    defaultValues: {
      name: '',
      description: '',
      shortcode: '',
      url: '',
    },
  })

  useEffect(() => {
    if (application) {
      form.reset({
        description: application.description,
        name: application.name,
        shortcode: application.shortcode,
        url: application.url,
      })

      setCurrentIcon(application.logo_url)
      setCurrentScreenshots(application.screenshots)
    }
  }, [application, form])

  const handleAddIconClick = () => {
    if (iconInputRef.current) {
      iconInputRef.current.click()
    }
  }

  const handleIconChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const fileArray = Array.from(files)
      const fileUrls = await prepareFileNames(fileArray)
      setCurrentIcon(fileUrls[0])
    }
  }

  const handleAddScreenshotClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleScreenshotsChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const fileArray = Array.from(files)
      const fileUrls = await prepareFileNames(fileArray)

      setCurrentScreenshots((prevState) => {
        const uniqueFiles = fileUrls.filter((fileUrl) => !prevState.includes(fileUrl))
        return [...prevState, ...uniqueFiles]
      })
    }
  }

  const handleDeleteFile = (index: number) => {
    setCurrentScreenshots((prevState) => prevState.filter((_, i) => i !== index))
  }

  const prepareFileNames = async (files: File[]) => {
    const response = await toast.promise(
      uploadFiles(files),
      {
        success: 'Загрузка файлов прошла успешно',
        error: 'Произошла непредвиденная ошибка при загрузке файлов',
        loading: 'Загрузка файлов',
      },
      {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      }
    )
    return response.map((file) => API_URL + file.url)
  }

  const onSubmit = (values: EditServiceSchema) => {
    const checkedData = EditServiceSchema.safeParse(values)
    if (checkedData.success) {
      const formData = checkedData.data
      const editedService: PatchServiceDto = {
        ...formData,
        logo_url: currentIcon ?? application?.logo_url ?? '',
        screenshots: currentScreenshots,
      }
      mutate({ params: { serviceId: Number(id), dto: editedService } })
    }
  }

  if (isLoading) {
    return (
      <div className='flex h-[100vh] w-[100vw] items-center justify-center'>
        <Spinner />
      </div>
    )
  }

  return (
    <>
      <div className='mx-auto mt-3 flex w-[95%] flex-col pb-28'>
        <div className='flex flex-row items-center'>
          <h1 className='text-2xl font-bold'>Редактор приложений</h1>
        </div>
        <div className='mt-3'>
          <Card>
            <CardHeader>
              <CardTitle>Изменение проекта</CardTitle>
              <CardDescription>Введите данные для изменения проекта</CardDescription>
            </CardHeader>
            <CardContent>
              <Card style={{ marginBottom: '16px' }}>
                <CardHeader>
                  <CardTitle>Изменение иконки</CardTitle>
                  <CardContent className='flex flex-row items-center justify-between p-0'>
                    <div>
                      <Button size='sm' className='gap-1' onClick={handleAddIconClick}>
                        <PlusCircle className='h-3.5 w-3.5' />
                        Изменить иконку
                      </Button>
                      <input
                        type='file'
                        ref={iconInputRef}
                        className='hidden'
                        onChange={handleIconChange}
                        accept='image/*'
                      />
                    </div>
                    <div className='h-24 w-24 flex-shrink-0 overflow-hidden rounded-2xl'>
                      <img src={currentIcon || ''} alt={`${currentIcon} icon`} className='h-full w-full object-cover' />
                    </div>
                  </CardContent>
                </CardHeader>
              </Card>
              <Card className='mb-1 mt-2'>
                <CardHeader>
                  <CardTitle>Изменение скриншотов</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea.Root className='w-full' type='scroll'>
                    <ScrollArea.Viewport className='w-full overflow-x-scroll'>
                      <div className='flex flex-row justify-center gap-4 p-4'>
                        {currentScreenshots.map((screenshot, index) => (
                          <div
                            key={`${screenshot}-${index}`}
                            className='relative h-96 w-48 overflow-hidden rounded-lg shadow-lg transition-transform hover:scale-105'
                          >
                            <img
                              src={screenshot}
                              alt={`Screenshot ${index + 1}`}
                              className='h-full w-full object-cover'
                            />

                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  onClick={() => setIndexToDelete(index)}
                                  className='absolute right-2 top-2 rounded-full bg-red-500 p-2 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2'
                                  aria-label={`Delete screenshot ${index + 1}`}
                                >
                                  <FileX className='h-4 w-4' />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Вы уверены?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Это действие нельзя отменить. Скриншот будет удален навсегда.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Отмена</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => indexToDelete !== null && handleDeleteFile(indexToDelete)}
                                  >
                                    Удалить
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        ))}
                      </div>
                    </ScrollArea.Viewport>
                    <ScrollArea.Scrollbar
                      className='flex touch-none select-none bg-[#212121] p-0.5 transition-colors duration-150 ease-out hover:bg-gray-800 data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col'
                      orientation='horizontal'
                    >
                      <ScrollArea.Thumb className="relative flex-1 rounded-[10px] bg-gray-600 before:absolute before:left-1/2 before:top-1/2 before:h-full before:min-h-[44px] before:w-full before:min-w-[44px] before:-translate-x-1/2 before:-translate-y-1/2 before:content-['']" />
                    </ScrollArea.Scrollbar>
                  </ScrollArea.Root>
                </CardContent>
                <CardFooter className='justify-center border-t p-4'>
                  <Button size='sm' className='gap-1' onClick={handleAddScreenshotClick}>
                    <PlusCircle className='h-3.5 w-3.5' />
                    Добавить скриншоты
                  </Button>
                  <input
                    type='file'
                    ref={fileInputRef}
                    className='hidden'
                    onChange={handleScreenshotsChange}
                    accept='image/*'
                    multiple
                  />
                </CardFooter>
              </Card>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                  <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Название</FormLabel>
                        <FormControl>
                          <Input
                            type='text'
                            {...field}
                            onChange={(e) => field.onChange(e.target.value)}
                            placeholder='Введите название приложения...'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='shortcode'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Короткое описание</FormLabel>
                        <FormControl>
                          <Textarea
                            className='min-h-[100px] resize-none'
                            placeholder='Введите краткое описание...'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='description'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Описание</FormLabel>
                        <FormControl>
                          <Textarea
                            className='min-h-[150px] resize-none'
                            placeholder='Введите полное описание...'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='url'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>URL</FormLabel>
                        <FormControl>
                          <Input
                            type='text'
                            placeholder='Введите URL приложения...'
                            {...field}
                            onChange={(e) => field.onChange(e.target.value)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type='submit' className='w-full'>
                    {isPending ? <Loader2 className='h-8 w-8 animate-spin text-primary' /> : 'Сохранить'}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
      <Toaster />
    </>
  )
}

export default EditAppPage
