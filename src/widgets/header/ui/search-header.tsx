import { Dispatch, useState } from 'react'
import { Check } from 'lucide-react'
import { useDispatch } from 'react-redux'

import { cn } from '@/lib/utils'

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

import { TEXT } from '@/consts/text'
import { useGetCities } from '@/utils/api/hooks/cities/use-get-cities'
import { setFilterCitiId } from '@/utils/redux/filter-settings-slice'

interface SearchHeaderProps {
  isOpen: boolean
  onChangeOpen: Dispatch<React.SetStateAction<boolean>>
}

export function SearchHeader({ isOpen, onChangeOpen }: SearchHeaderProps) {
  const [value, setValue] = useState('')
  const { data: allCities } = useGetCities()
  const dispatch = useDispatch()

  return (
    <Popover open={isOpen}>
      <PopoverTrigger asChild>
        <div className=''></div>
      </PopoverTrigger>
      <PopoverContent className='relative z-[70] w-screen rounded-b-2xl border-none bg-background-invert p-0 px-4 pb-5'>
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
                      onChangeOpen(false)
                    }}
                  >
                    {city.name}
                    <Check className={cn('mr-2 h-4 w-4', value === city.name ? 'opacity-100' : 'opacity-0')} />
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
        <div className='box-shadow-form absolute bottom-0 left-0 h-1/2 w-full rounded-b-2xl'></div>
        <div className='absolute left-0 top-0 z-10 h-full w-full rounded-b-2xl bg-background-invert'></div>
      </PopoverContent>
    </Popover>
  )
}
