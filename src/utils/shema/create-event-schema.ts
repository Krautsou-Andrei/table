import { EventCategory } from '@/consts/event-category'
import { VARIABLES } from '@/consts/variables'
import * as z from 'zod'

export const eventSchema = z.object({
  [VARIABLES.REGISTER_FIELD_TILE]: z
    .string({
      required_error: 'Поле обязательно для заполнения',
    })
    .min(1, 'Поле обязательно для заполнения'),
  [VARIABLES.REGISTER_FIELD_DESCRIPTION]: z
    .string({
      required_error: 'Поле обязательно для заполнения',
    })
    .min(1, 'Поле обязательно для заполнения'),
  [VARIABLES.REGISTER_FIELD_IMAGE]: z.instanceof(File).optional(),
  [VARIABLES.REGISTER_FIELD_DATE]: z.date({
    required_error: 'Поле обязательно для заполнения',
  }),
  [VARIABLES.REGISTER_FIELD_HOUR]: z
    .string({
      required_error: 'Поле обязательно для заполнения',
    })
    .min(1, 'Поле обязательно для заполнения')
    .regex(/^([01][0-9]|2[0-3])$/, 'Введите часы в формате от 00 до 23'),
  [VARIABLES.REGISTER_FIELD_MINUTE]: z
    .string({
      required_error: 'Поле обязательно для заполнения',
    })
    .min(1, 'Поле обязательно для заполнения')
    .regex(/^([0-5][0-9])$/, 'Введите минуты в формате от 00 до 59'),
  [VARIABLES.REGISTER_FIELD_CITY_ID]: z.number({
    required_error: 'Поле обязательно для заполнения',
  }),
  [VARIABLES.REGISTER_FIELD_LOCATION]: z
    .string({
      required_error: 'Поле обязательно для заполнения',
    })
    .url('Введите корректный URL'),
  [VARIABLES.REGISTER_FIELD_PRICE]: z.string(),
  [VARIABLES.REGISTER_FIELD_URL]: z.string().optional(),
  [VARIABLES.REGISTER_FIELD_CATEGORY]: z.nativeEnum(EventCategory),
  [VARIABLES.REGISTER_FIELD_CURRENCY]: z.enum(['₺', '₽', '$']),
})

export type EventFormValues = z.infer<typeof eventSchema>
