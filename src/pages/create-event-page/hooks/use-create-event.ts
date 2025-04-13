import { useState, useRef, ChangeEvent, useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDispatch, useSelector } from 'react-redux'

import { CreateEventDTO, type EventCategory } from '@/types/api'

import { setIsSend } from '@/utils/redux/create-event-form-slice'
import { formatDateDots } from '@/utils/formatDate'
import { EventFormValues, eventSchema } from '@/utils/shema/create-event-schema'
import { uploadFiles } from '@/utils/api/requests/files/upload-file'
import { API_URL } from '@/utils/api/axios-instance-core'
import { RootState } from '@/utils/redux/store'
import { useCreateNewEvent } from '@/utils/api/hooks/events/use-create-new-event'

import { EventCategory as EventCategoryObject } from '@/consts/event-category'
import { EVENT_COVER_PLACEHOLDER_URL } from '@/consts/placeholder'
import { VARIABLES } from '@/consts/variables'
import { ROUTES } from '@/consts/routes'

export const useCreateEvent = () => {
  const dispatch = useDispatch()
  const isSend = useSelector((state: RootState) => state.createEvent.isSend)
  const navigate = useNavigate()

  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [isOpenCalendar, setIsOpenCalendar] = useState(false)
  const [isOpenCalendarHeader, setIsOpenCalendarHeader] = useState(false)
  const [isOpenSuccess, setIsOpenSuccess] = useState(false)
  const [isOpenSelectCategory, setIsOpenSelectCategory] = useState(false)
  const [isOpenSelectCurrency, setIsOpenSelectCurrency] = useState(false)
  const [isOpenSelectCity, setIsOpenSelectCity] = useState(false)
  const [idEvent, setIdEvent] = useState(0)

  const [widthButton, setWidthButton] = useState(0)
  const [file, setFile] = useState<File | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const refDatebutton = useRef<HTMLButtonElement | null>(null)

  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      [VARIABLES.REGISTER_FIELD_TILE]: '',
      [VARIABLES.REGISTER_FIELD_DESCRIPTION]: '',
      [VARIABLES.REGISTER_FIELD_CATEGORY]: EventCategoryObject.NOT_CATEGORY,
      [VARIABLES.REGISTER_FIELD_CURRENCY]: '₽',
      [VARIABLES.REGISTER_FIELD_PRICE]: '',
      [VARIABLES.REGISTER_FIELD_CITY_ID]: 1,
      [VARIABLES.REGISTER_FIELD_DATE]: new Date(),
      [VARIABLES.REGISTER_FIELD_HOUR]: '',
      [VARIABLES.REGISTER_FIELD_MINUTE]: '',
      [VARIABLES.REGISTER_FIELD_LOCATION]: '',
      [VARIABLES.REGISTER_FIELD_URL]: '',
    },
  })

  const handleOnOpenChange = useCallback(() => {
    setIsOpenSuccess((prev) => {
      if (prev && idEvent) {
        navigate(`${ROUTES.EVENT_ID}/${idEvent}`)
      }
      return !prev
    })
    form.reset()
    setPreviewImage(() => null)
  }, [form, navigate, idEvent])

  const { mutateAsync: create } = useCreateNewEvent({ handleSuccess: handleOnOpenChange, setIdEvent: setIdEvent })

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

  const onSubmit = useCallback(
    async (data: EventFormValues) => {
      let imageUrl: string[] = []
      if (file) {
        imageUrl = await prepareFileNames([file])
      }

      const dateObj = new Date(data.date)
      const datetime = `${dateObj.getFullYear()}-${(dateObj.getMonth() + 1)
        .toString()
        .padStart(
          2,
          '0'
        )}-${dateObj.getDate().toString().padStart(2, '0')}T${data[VARIABLES.REGISTER_FIELD_HOUR]}:${data[VARIABLES.REGISTER_FIELD_MINUTE]}:00.000Z`

      const dto: CreateEventDTO = {
        [VARIABLES.REGISTER_FIELD_TILE]: data[VARIABLES.REGISTER_FIELD_TILE],
        [VARIABLES.REGISTER_FIELD_DESCRIPTION]: data[VARIABLES.REGISTER_FIELD_DESCRIPTION],
        [VARIABLES.REGISTER_FIELD_IMAGE]: imageUrl[0] ? imageUrl[0] : EVENT_COVER_PLACEHOLDER_URL,
        [VARIABLES.REGISTER_FIELD_DATE_TIME]: datetime,
        [VARIABLES.REGISTER_FIELD_CITY_ID]: data[VARIABLES.REGISTER_FIELD_CITY_ID],
        [VARIABLES.REGISTER_FIELD_LOCATION]: data[VARIABLES.REGISTER_FIELD_LOCATION],
        [VARIABLES.REGISTER_FIELD_PRICE]: Number(data[VARIABLES.REGISTER_FIELD_PRICE] || 0),
        [VARIABLES.REGISTER_FIELD_URL]: data[VARIABLES.REGISTER_FIELD_URL] ?? '',
        [VARIABLES.REGISTER_FIELD_CATEGORY]: data[VARIABLES.REGISTER_FIELD_CATEGORY] as EventCategory,
        [VARIABLES.REGISTER_FIELD_CURRENCY]: data[VARIABLES.REGISTER_FIELD_CURRENCY],
      }

      await create(dto)
    },
    [create, file]
  )

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (file) {
      const sanitizedFileName = file.name.replace(/\s+/g, '')

      const newFile = new File([file], sanitizedFileName, { type: file.type })

      setFile(newFile)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result as string)
      }
      reader.readAsDataURL(newFile)
      form.setValue('image', newFile)
    }
  }

  const handleDeleteImage = () => {
    setPreviewImage(null)
    setFile(null)
    form.setValue('image', undefined)
  }

  const currentDate = new Date()
  const date = formatDateDots(currentDate)

  const handleTriggerCalendarHeader = () => {
    setIsOpenCalendarHeader((prev) => !prev)
  }

  useEffect(() => {
    if (isSend) {
      form.handleSubmit(onSubmit)()
      dispatch(setIsSend(false))
    }
  }, [dispatch, form, isSend, onSubmit])

  useEffect(() => {
    if (refDatebutton.current) {
      setWidthButton(refDatebutton.current.offsetWidth)
    }
  }, [])

  return {
    state: {
      date,
      isOpenCalendar,
      isOpenCalendarHeader,
      isOpenSelectCategory,
      isOpenSelectCurrency,
      isOpenSelectCity,
      isOpenSuccess,
      fileInputRef,
      form,
      previewImage,
      refDatebutton,
      widthButton,
    },
    functions: {
      handleDeleteImage,
      handleFileChange,
      handleTriggerCalendarHeader,
      handleOnOpenChange,
      onSubmit,
      setIsOpenCalendar,
      setIsOpenSelectCategory,
      setIsOpenSelectCity,
      setIsOpenSelectCurrency,
    },
  }
}
