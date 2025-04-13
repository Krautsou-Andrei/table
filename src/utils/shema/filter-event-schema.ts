import * as z from 'zod'

import { EventCategory } from '@/consts/event-category'
import { VARIABLES } from '@/consts/variables'

export const filterEventSchema = z.object({
  [VARIABLES.REGISTER_FIELD_LOCATION]: z.string().optional(), // Поле не обязательно
  [VARIABLES.REGISTER_FIELD_CATEGORY]: z.nativeEnum(EventCategory).optional(), // Поле не обязательно
  [VARIABLES.REGISTER_FIELD_SORT]: z.string().optional(), // Поле не обязательно
})

export type FilterEventFormValues = z.infer<typeof filterEventSchema>
