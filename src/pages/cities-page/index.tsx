import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table.tsx'
import { Button } from '@/components/ui/button.tsx'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getCities } from '@/utils/api/requests/cities/get-cities.ts'
import { Spinner } from '@/components/ui/spinner.tsx'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label.tsx'
import { Input } from '@/components/ui/input.tsx'
import { addCity } from '@/utils/api/requests/cities/add-city.ts'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/consts/routes'
import useBackButton from '@/utils/hooks/useBackButton.ts'

function CitiesPage() {
  useBackButton()
  const [newCityName, setNewCityName] = useState('')
  const navigate = useNavigate()

  const {
    data: cities,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['cities'],
    queryFn: () => getCities({}),
    select: (data) => data.data,
  })

  const { mutate: create } = useMutation({
    mutationFn: addCity,
    onSuccess: async () => {
      toast.success('Город был создан успешно')
      await refetch()
    },
    onError: () => {
      toast.error('Возникла ошибка при создании города')
    },
  })

  if (isLoading) {
    return (
      <div className='flex h-[100vh] w-[100vw] items-center justify-center'>
        <Spinner />
      </div>
    )
  }

  console.log('cities', cities)

  return (
    <div className='container p-4 pb-16'>
      <h1 className='text-2xl font-bold'>Города</h1>
      <div className='mt-6 rounded-lg border'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Город</TableHead>
              <TableHead>Чаты</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cities?.map((city) => (
              <TableRow key={city.id}>
                <TableCell className='w-[30%]'>{city.name}</TableCell>
                <TableCell className='w-[30%]'>{city.chats.length}</TableCell>
                <TableCell className='w-[40%]'>
                  <Button className='w-full bg-[#DEDEDE]' onClick={() => navigate(`${ROUTES.CITIES}/${city.id}`)}>
                    Перейти
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <Button className='mt-4 w-full bg-[#DEDEDE] text-lg'>Добавить</Button>
        </DialogTrigger>
        <DialogContent className='w-[95%] rounded-lg'>
          <DialogHeader>
            <DialogTitle>Создание города</DialogTitle>
            <DialogDescription>Введите название нового города</DialogDescription>
          </DialogHeader>
          <div className='flex flex-col gap-2'>
            <Label htmlFor='name'>Название города</Label>
            <Input id='name' value={newCityName} onChange={(e) => setNewCityName(e.target.value)} />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type='submit' onClick={() => create({ params: { name: newCityName } })}>
                Создать
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default CitiesPage
