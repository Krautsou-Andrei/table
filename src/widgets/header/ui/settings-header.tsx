import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

import { VARIABLES } from '@/consts/variables'
import { TEXT } from '@/consts/text'

import { CATEGORIES } from '@/consts/form-constants'

import { SORT_EVENTS } from '@/consts/sort-events'
import { useSettingsHeader } from '../hooks/use-settings-header'

interface SettingsHeaderProps {
  isOpen: boolean
}

export function SettingsHeader({ isOpen }: SettingsHeaderProps) {
  const { state, functions } = useSettingsHeader()

  return (
    <Popover open={isOpen}>
      <PopoverTrigger asChild>
        <div className=''></div>
      </PopoverTrigger>
      <PopoverContent className='relative z-[70] w-screen rounded-b-2xl border-none bg-background-invert p-0 px-4 pb-5'>
        <div className='relative z-20 flex flex-col gap-4'>
          <Form {...state.form}>
            <form onSubmit={state.form.handleSubmit(functions.onSubmit)}>
              <FormField
                control={state.form.control}
                name={VARIABLES.REGISTER_FIELD_LOCATION}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-[10px]'>{TEXT.LOCATION}:</FormLabel>
                    <RadioGroup
                      className='flex flex-wrap items-center gap-2'
                      value={field?.value?.toString()}
                      onValueChange={(event) => {
                        field.onChange(event)
                        state.form.handleSubmit(functions.onSubmit)()
                      }}
                    >
                      {state.allCities && state.allCities.length > 0 ? (
                        state.allCities.map((city) => (
                          <div
                            key={city.id}
                            className={`flex items-center overflow-hidden rounded-2xl uppercase leading-[122%] ${field?.value?.toString() === city.id.toString() ? 'bg-background-card text-text-invert' : 'bg-background-buttonDate'}`}
                          >
                            <RadioGroupItem className='hidden' value={`${city.id}`} id={`${city.id}`} />
                            <Label className='cursor-pointer px-4 py-2.5' htmlFor={`${city.id}`}>
                              {city.name}
                            </Label>
                          </div>
                        ))
                      ) : (
                        <div className='w-full text-center'>{TEXT.EMPTY}</div>
                      )}
                    </RadioGroup>
                  </FormItem>
                )}
              />

              <FormField
                control={state.form.control}
                name={VARIABLES.REGISTER_FIELD_CATEGORY}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-[10px]'>{TEXT.CATEGORIES}:</FormLabel>
                    <Select
                      onValueChange={(event) => {
                        field.onChange(event)
                        state.form.handleSubmit(functions.onSubmit)()
                      }}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className={`relative z-[60] h-[28px] bg-background-card text-[10px]`}>
                          <SelectValue placeholder='Выберите категорию' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {CATEGORIES.map((category) => (
                          <SelectItem className='text-[10px]' key={category.id} value={category.value}>
                            {category.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={state.form.control}
                name={VARIABLES.REGISTER_FIELD_SORT}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-[10px]'>{TEXT.SORT}:</FormLabel>
                    <RadioGroup
                      className='flex flex-wrap items-center gap-2'
                      value={`sort-${field?.value?.toString()}`}
                      onValueChange={(event) => {
                        field.onChange(event)
                        state.form.handleSubmit(functions.onSubmit)()
                      }}
                      defaultValue='option-one'
                    >
                      {SORT_EVENTS.map((sort) => (
                        <div
                          key={sort.id}
                          className={`flex items-center overflow-hidden rounded-2xl uppercase leading-[122%] ${`sort-${field?.value?.toString()}` === `sort-${sort.id}` ? 'bg-background-card text-text-invert' : 'bg-background-buttonDate'}`}
                        >
                          <RadioGroupItem className='hidden' value={`${sort.id}`} id={`sort-${sort.id}`} />
                          <Label
                            className='cursor-pointer px-4 py-[9px] text-[10px] leading-[122%]'
                            htmlFor={`sort-${sort.id}`}
                          >
                            {sort.name}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>

        <div className='box-shadow-form absolute bottom-0 left-0 h-1/2 w-full rounded-b-2xl'></div>
        <div className='absolute left-0 top-0 z-10 h-full w-full rounded-b-2xl bg-background-invert'></div>
      </PopoverContent>
    </Popover>
  )
}
