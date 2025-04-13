import * as z from 'zod'

import { VARIABLES } from '@/consts/variables'

export const filterCitySchema = z.object({
  [VARIABLES.REGISTER_FIELD_CITY_ID]: z.string(),
})

export type FilterCityFormValues = z.infer<typeof filterCitySchema>
