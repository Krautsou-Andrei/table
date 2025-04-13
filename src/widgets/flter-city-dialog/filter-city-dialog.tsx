import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

import { TEXT } from '@/consts/text'

import { Check, X } from 'lucide-react'

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { cn } from '@/lib/utils'
import { setFilterCitiId } from '@/utils/redux/filter-settings-slice'
import { useGetCities } from '@/utils/api/hooks/cities/use-get-cities'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { Label } from '@radix-ui/react-label'
import { RadioGroup, RadioGroupItem } from '@radix-ui/react-radio-group'
import { RootState } from '@/utils/redux/store'

interface SuccessDialogApp {
  conut?: number
  isOpen: boolean
  onOpenChange: () => void
  title: string
  subTitle?: string
}

export const FilterCityDialog = ({ isOpen, onOpenChange, title }: SuccessDialogApp) => {
  const [value, setValue] = useState('')
  const filterSettings = useSelector((state: RootState) => state.filterSettings)
  const { data: allCities } = useGetCities()
  const dispatch = useDispatch()

  useEffect(() => {
    const idCity = allCities?.find((city) => city.name === value)

    if (idCity) {
      dispatch(setFilterCitiId(String(idCity.id)))
    }
  }, [allCities, dispatch, value])

  useEffect(() => {
    const nameCity = allCities?.find((city) => String(city.id) === filterSettings.citiId)

    if (nameCity) {
      setValue(nameCity.name)
    }
  }, [allCities, filterSettings.citiId])

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className='flex h-[100%] w-[100%] flex-col p-8'>
          <DialogHeader>
            <div className='mb-[10px] flex w-full justify-between'>
              <DialogTitle className='text-xl'>{title}</DialogTitle>
              <DialogClose className='shadow-none focus:shadow-none focus:outline-none' style={{ boxShadow: 'none' }}>
                <X className='h-6 w-6 text-orange-300' />
                <span className='sr-only'>Close</span>
              </DialogClose>
            </div>
          </DialogHeader>
          <div className='flex flex-1 flex-col items-center gap-2'>
            <div className='h-[146px] w-full'>
              <Command className='relative z-20'>
                <CommandInput placeholder={TEXT.I_SEARCH} />
                <CommandList>
                  <CommandEmpty>{TEXT.NOT_FOUND}</CommandEmpty>
                  <CommandGroup className='scroll max-h-32 overflow-auto'>
                    {allCities &&
                      allCities.length > 0 &&
                      allCities.map((city) => (
                        <CommandItem
                          key={city.id}
                          value={city.name}
                          onSelect={(currentValue) => {
                            setValue(currentValue === value ? '' : currentValue)

                            dispatch(setFilterCitiId(String(city.id)))
                          }}
                        >
                          {city.name}
                          <Check className={cn('mr-2 h-4 w-4', value === city.name ? 'opacity-100' : 'opacity-0')} />
                        </CommandItem>
                      ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </div>
            <div className='w-full'>
              <RadioGroup
                className='flex w-full flex-wrap items-center gap-2'
                value={filterSettings.citiId}
                onValueChange={(event) => {
                  console.log('event', event)
                  dispatch(setFilterCitiId(event))
                }}
              >
                {allCities && allCities.length > 0 ? (
                  allCities.map((city) => (
                    <div
                      key={city.id}
                      className={`flex items-center overflow-hidden rounded-2xl uppercase leading-[122%] ${filterSettings.citiId.toString() === city.id.toString() ? 'bg-background-card text-text-invert' : 'bg-background-buttonDate'}`}
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
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
