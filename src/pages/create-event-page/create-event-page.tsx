import { format } from 'date-fns'
import { cn } from '@/lib/utils.ts'

import { useCreateEvent } from './hooks/use-create-event'

import { Header } from '@/widgets/header'

import { SuccessDialogApp } from '@/widgets/success-dialog-app'

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover.tsx'
import { Calendar } from '@/components/ui/calendar.tsx'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { AppLayout } from '@/components/ui/app-layout'
import { AppIcon } from '@/components/ui/app-icon'

import { CATEGORIES, CURRENCY } from '@/consts/form-constants'
import { TEXT } from '@/consts/text'
import { VARIABLES } from '@/consts/variables'
import { useGetCities } from '@/utils/api/hooks/cities/use-get-cities'

export const CreateEventPage = () => {
  const { state, functions } = useCreateEvent()
  const { data: allCities } = useGetCities()

  return (
    <div className='min-h-dvh bg-[var(--backgroundHeader)]'>
      <Header />
      <AppLayout className='rounded-t-2xl bg-[var(--backgroundSecondary)] pb-[113px]'>
        <>
          <h2 className='mb-4 pt-4 text-center text-xl font-bold uppercase'>{TEXT.EVENTS_EDIT}</h2>
          <Form {...state.form}>
            <form onSubmit={state.form.handleSubmit(functions.onSubmit)} className='space-y-4'>
              <div className='rounded-2xl bg-[var(--backgroundInvert)]'>
                <input
                  type='file'
                  accept='image/*'
                  ref={state.fileInputRef}
                  onChange={functions.handleFileChange}
                  className='hidden'
                />
                <div className='box-shadow-form h-[228px] w-full overflow-hidden rounded-2xl transition-transform'>
                  {state.previewImage ? (
                    <div className='relative h-full w-full'>
                      <img src={state.previewImage} alt='Preview' className='h-full w-full object-cover' />
                      <button
                        type='button'
                        className='absolute right-2 top-2 rounded-full bg-white p-1 shadow'
                        onClick={functions.handleDeleteImage}
                        aria-label='Удалить изображение'
                      >
                        <span className='text-red-500'>✖</span>
                      </button>
                    </div>
                  ) : (
                    <div className='flex h-full w-full flex-col items-center justify-center gap-2'>
                      <Button
                        type='button'
                        variant={'fit'}
                        size={'fit'}
                        onClick={() => state.fileInputRef.current?.click()}
                        aria-label={TEXT.SELECT_FILE}
                      >
                        <AppIcon name='app/load_image' width={60} height={60} />
                      </Button>
                      <span className='uppercase leading-[122%]'>{TEXT.SELECT_FILE}</span>
                    </div>
                  )}
                </div>
              </div>

              <FormField
                control={state.form.control}
                name={VARIABLES.REGISTER_FIELD_TILE}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{TEXT.NAME}</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder={`${TEXT.EVENT}...`} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={state.form.control}
                name={VARIABLES.REGISTER_FIELD_CATEGORY}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{TEXT.CATEGORIES}</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      onOpenChange={(open) => functions.setIsOpenSelectCategory(open)}
                    >
                      <FormControl>
                        <SelectTrigger
                          className={`relative border-purple-200 ${state.isOpenSelectCategory ? 'z-[60]' : 'z-50'}`}
                        >
                          <SelectValue placeholder='Выберите категорию' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {CATEGORIES.map((category) => (
                          <SelectItem key={category.id} value={category.value}>
                            {category.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={state.form.control}
                name={VARIABLES.REGISTER_FIELD_DESCRIPTION}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{TEXT.DESCRIPTIONS}</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder={`${TEXT.SAY_EVENTS}...`} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className='flex flex-grow items-end justify-between gap-2'>
                <FormField
                  control={state.form.control}
                  name={VARIABLES.REGISTER_FIELD_PRICE}
                  render={({ field }) => (
                    <FormItem className='w-full'>
                      <FormLabel>{TEXT.COST_PARTICIPATION}</FormLabel>
                      <FormControl>
                        <Input
                          type='number'
                          {...field}
                          className='text-xl font-bold placeholder:text-xl placeholder:font-bold placeholder:text-text-placeholder'
                          placeholder='0'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={state.form.control}
                  name={VARIABLES.REGISTER_FIELD_CURRENCY}
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        onOpenChange={(open) => functions.setIsOpenSelectCurrency(open)}
                      >
                        <FormControl>
                          <SelectTrigger
                            className={`relative ${state.isOpenSelectCurrency ? 'z-[60]' : 'z-50'} h-11 w-[87px] text-xl`}
                          >
                            <SelectValue placeholder='$' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {CURRENCY.map((currency) => (
                            <SelectItem key={currency.id} value={currency.value}>
                              {currency.value}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className='flex flex-row items-start gap-4'>
                <div className='flex flex-col gap-1'>
                  <FormField
                    control={state.form.control}
                    name={VARIABLES.REGISTER_FIELD_HOUR}
                    render={({ field }) => (
                      <FormItem className='w-[88px]'>
                        <FormLabel>{TEXT.TIME}</FormLabel>
                        <FormControl>
                          <Input
                            type='text'
                            {...field}
                            className='text-xl font-bold placeholder:text-xl placeholder:font-bold placeholder:text-text-placeholder'
                            placeholder='00'
                            onKeyDown={(e) => {
                              if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete') {
                                e.preventDefault()
                              }
                            }}
                            onChange={(e) => {
                              const value = e.target.value.replace(/\D/g, '')
                              let hour = parseInt(value, 10)

                              if (isNaN(hour) || hour < 0 || hour > VARIABLES.HOURS) {
                                hour = 0
                              }

                              field.onChange(hour.toString().padStart(2, '0'))
                            }}
                            onBlur={() => {
                              const hour = parseInt(field.value, 10)
                              if (isNaN(hour) || hour < 0 || hour > VARIABLES.HOURS) {
                                field.onChange('00')
                              } else {
                                field.onChange(hour.toString().padStart(2, '0'))
                              }
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={state.form.control}
                    name={VARIABLES.REGISTER_FIELD_MINUTE}
                    render={({ field }) => (
                      <FormItem className='w-[88px]'>
                        <FormControl>
                          <Input
                            type='text'
                            {...field}
                            className='text-xl font-bold placeholder:text-xl placeholder:font-bold placeholder:text-text-placeholder'
                            placeholder='00'
                            onKeyDown={(e) => {
                              if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete') {
                                e.preventDefault()
                              }
                            }}
                            onChange={(e) => {
                              const value = e.target.value.replace(/\D/g, '')
                              let minute = parseInt(value, 10)

                              if (isNaN(minute) || minute < 0 || minute > VARIABLES.MINUTES) {
                                minute = 0
                              }

                              field.onChange(minute.toString().padStart(2, '0'))
                            }}
                            onBlur={() => {
                              const minute = parseInt(field.value, 10)
                              if (isNaN(minute) || minute < 0 || minute > VARIABLES.MINUTES) {
                                field.onChange('00')
                              } else {
                                field.onChange(minute.toString().padStart(2, '0'))
                              }
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={state.form.control}
                  name={VARIABLES.REGISTER_FIELD_DATE}
                  render={({ field }) => (
                    <FormItem className='flex w-full flex-col'>
                      <FormLabel
                        className='mb-1'
                        onClick={() => {
                          event?.preventDefault()
                        }}
                      >
                        {TEXT.DATE}
                      </FormLabel>
                      <Popover open={state.isOpenCalendar} onOpenChange={functions.setIsOpenCalendar}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              ref={state.refDatebutton}
                              variant={'outline'}
                              className={cn(
                                'my-5 h-11 rounded-2xl border-none bg-[var(--backgroundInvert)] pl-3 text-left text-xl font-bold uppercase text-text-placeholder hover:bg-background-invert hover:text-text-third',
                                state.isOpenCalendar ? 'z-[60] bg-background-invert text-text-third' : 'box-shadow-form'
                              )}
                            >
                              {field.value ? format(field.value, 'dd.MM.yyyy') : <span>{state.date}</span>}

                              <AppIcon name='icon/calendar' className='ml-auto' />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent
                          style={{ width: `${state.widthButton}px` }}
                          className='relative -top-6 rounded-2xl px-0 pt-9'
                          align='start'
                        >
                          <Calendar
                            mode='single'
                            selected={field.value}
                            onSelect={(date) => {
                              field.onChange(date)
                              functions.setIsOpenCalendar(false)
                            }}
                            disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() - 1))}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={state.form.control}
                name={VARIABLES.REGISTER_FIELD_CITY_ID}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{TEXT.CITY}</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(Number(value))}
                      value={field.value ? String(field.value) : undefined}
                      onOpenChange={(open) => functions.setIsOpenSelectCity(open)}
                    >
                      <FormControl>
                        <SelectTrigger
                          className={`relative border-purple-200 ${state.isOpenSelectCity ? 'z-[60]' : 'z-50'}`}
                        >
                          <SelectValue placeholder='Выберите город' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {allCities &&
                          allCities.length > 0 &&
                          allCities.map((city) => (
                            <SelectItem key={city.id} value={String(city.id)}>
                              {city.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={state.form.control}
                name={VARIABLES.REGISTER_FIELD_LOCATION}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{TEXT.LINK_GOOGLE_MAPS}</FormLabel>

                    <FormControl>
                      <Input
                        {...field}
                        placeholder={TEXT.PLACEHOLDER_GOOGLE_MAP}
                        className='h-[33px] placeholder:text-text-placeholder'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={state.form.control}
                name={VARIABLES.REGISTER_FIELD_URL}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{TEXT.LINK_DISCUSSION}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={TEXT.PLACEHOLDER_DISCUSSION}
                        className='h-[33px] placeholder:text-text-placeholder'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <SuccessDialogApp
                conut={3}
                title={TEXT.EVENT_PUBLIC}
                subTitle={TEXT.YOU_CREDITED}
                isOpen={state.isOpenSuccess}
                onOpenChange={functions.handleOnOpenChange}
              />
            </form>
          </Form>
        </>
      </AppLayout>
    </div>
  )
}
