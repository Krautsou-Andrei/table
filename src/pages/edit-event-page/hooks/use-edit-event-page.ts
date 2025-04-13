import { useState, useRef, ChangeEvent, useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDispatch, useSelector } from 'react-redux'

import { EditEventDTO, type EventCategory } from '@/types/api'

import { setIsSend } from '@/utils/redux/create-event-form-slice'
import { formatDateDots } from '@/utils/formatDate'
import { EventFormValues, eventSchema } from '@/utils/shema/create-event-schema'
import { uploadFiles } from '@/utils/api/requests/files/upload-file'
import { API_URL } from '@/utils/api/axios-instance-core'
import { RootState } from '@/utils/redux/store'

import { EventCategory as EventCategoryObject } from '@/consts/event-category'
import { VARIABLES } from '@/consts/variables'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetEvent } from '@/utils/api/hooks/events/use-get-event'
import { useEditEvent } from '@/utils/api/hooks/events/use-edit-event'
import { ROUTES } from '@/consts/routes'
import { EVENT_COVER_PLACEHOLDER_URL } from '@/consts/placeholder'

export const useEditEventPage = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { data: event } = useGetEvent(id!, Boolean(id))

  const isSend = useSelector((state: RootState) => state.createEvent.isSend)

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

  const { mutateAsync: editEvent } = useEditEvent({ handleSuccess: handleOnOpenChange, setIdEvent: setIdEvent })

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

      const dto: EditEventDTO = {
        [VARIABLES.REGISTER_FIELD_TILE]: data[VARIABLES.REGISTER_FIELD_TILE],
        [VARIABLES.REGISTER_FIELD_DESCRIPTION]: data[VARIABLES.REGISTER_FIELD_DESCRIPTION],
        [VARIABLES.REGISTER_FIELD_IMAGE]: imageUrl[0]
          ? imageUrl[0]
          : previewImage
            ? previewImage
            : EVENT_COVER_PLACEHOLDER_URL,
        [VARIABLES.REGISTER_FIELD_DATE_TIME]: datetime,
        [VARIABLES.REGISTER_FIELD_CITY_ID]: data[VARIABLES.REGISTER_FIELD_CITY_ID],
        [VARIABLES.REGISTER_FIELD_LOCATION]: data[VARIABLES.REGISTER_FIELD_LOCATION],
        [VARIABLES.REGISTER_FIELD_PRICE]: Number(data[VARIABLES.REGISTER_FIELD_PRICE] || 0),
        [VARIABLES.REGISTER_FIELD_URL]: data[VARIABLES.REGISTER_FIELD_URL] ?? '',
        [VARIABLES.REGISTER_FIELD_CATEGORY]: data[VARIABLES.REGISTER_FIELD_CATEGORY] as EventCategory,
        [VARIABLES.REGISTER_FIELD_CURRENCY]: data[VARIABLES.REGISTER_FIELD_CURRENCY],
      }

      if (id) {
        await editEvent({ id: id, DTO: dto })
      }
    },
    [editEvent, file, id, previewImage]
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
    if (event) {
      const { setValue } = form
      const { title, description, datetime, category, price, location, cityId, image, url, currency } = event.data
      const date = new Date(datetime)
      const hours = String(date.getUTCHours()).padStart(2, '0')
      const minutes = String(date.getMinutes()).padStart(2, '0')

      setPreviewImage(image)
      setValue(VARIABLES.REGISTER_FIELD_TILE, title)
      setValue(VARIABLES.REGISTER_FIELD_DESCRIPTION, description)
      setValue(VARIABLES.REGISTER_FIELD_CITY_ID, cityId)
      setValue(VARIABLES.REGISTER_FIELD_CATEGORY, category as EventCategory)
      setValue(VARIABLES.REGISTER_FIELD_PRICE, price.toString())
      setValue(VARIABLES.REGISTER_FIELD_LOCATION, location)
      setValue(VARIABLES.REGISTER_FIELD_DATE, date)
      setValue(VARIABLES.REGISTER_FIELD_HOUR, hours.toString())
      setValue(VARIABLES.REGISTER_FIELD_MINUTE, minutes.toString())
      setValue(VARIABLES.REGISTER_FIELD_URL, url)
      setValue(VARIABLES.REGISTER_FIELD_CURRENCY, currency)
    }
  }, [event, form])

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
