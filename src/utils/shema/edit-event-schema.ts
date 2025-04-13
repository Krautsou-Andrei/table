import { z } from 'zod'

import { EventCategory } from '@/consts/event-category'

export const editEventSchema = z.object({
  title: z.string().min(1, 'Поле обязательно для заполнения'),
  description: z.string().min(1, 'Поле обязательно для заполнения'),
  date: z.date({
    required_error: 'Поле обязательно для заполнения',
  }),
  time: z
    .string()
    .min(1, 'Поле обязательно для заполнения')
    .regex(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, 'Введите время в формате HH:mm'),
  cityId: z.number(),
  location: z.string().url('Введите корректный URL'),
  price: z.string(),
  url: z.string().optional(),
  category: z.nativeEnum(EventCategory),
  currency: z.enum(['₺', '₽', '$']),
})

export type EditEventFormValues = z.infer<typeof editEventSchema>
