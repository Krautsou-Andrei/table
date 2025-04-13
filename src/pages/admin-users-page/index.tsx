import { useRef, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { getAllUsers } from '@/utils/api/requests/user/get-all-users.ts'
import useBackButton from '@/utils/hooks/useBackButton.ts'
import { useNavigate } from 'react-router-dom'

export default function UsersPage() {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const navigate = useNavigate()
  useBackButton()

  const { data, isLoading } = useQuery({
    queryKey: ['users', search, page],
    queryFn: () => getAllUsers({ params: { page: page, limit: 5, username: search } }),
    staleTime: 5000,
    select: (data) => data.data,
  })

  const totalPages = data ? data.meta.totalPages : 0

  return (
    <div className='container mx-auto space-y-6 p-4 pb-32'>
      <h1 className='text-2xl font-bold'>Пользователи</h1>

      <div className='flex flex-col gap-2'>
        <Input ref={inputRef} placeholder='Имя пользователя' className='max-w-sm' />
        <Button className='bg-[#DEDEDE] text-lg' onClick={() => setSearch(inputRef.current?.value ?? '')}>
          Найти
        </Button>
      </div>

      <div className='w-full rounded-lg'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Username</TableHead>
              <TableHead>Telegram ID</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className='text-center'>
                  Loading...
                </TableCell>
              </TableRow>
            ) : (
              data?.items.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className='text-white'>{user.username}</TableCell>
                  <TableCell  className='text-white'>{user.telegramId}</TableCell>
                  <TableCell>
                    <Button className='bg-[#DEDEDE]' onClick={() => navigate(`/admin/user/${user.id}`)}>
                      Профиль
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Pagination>
        <PaginationContent>
          {data?.meta.hasPrevPage && (
            <PaginationItem>
              <PaginationPrevious size='default' onClick={() => setPage((p) => Math.max(1, p - 1))} />
            </PaginationItem>
          )}

          {page > 2 && (
            <PaginationItem>
              <PaginationLink size='default' onClick={() => setPage(1)}>
                1
              </PaginationLink>
            </PaginationItem>
          )}

          {page > 3 && <PaginationEllipsis />}

          {page > 1 && (
            <PaginationItem>
              <PaginationLink size='default' onClick={() => setPage(page - 1)}>
                {page - 1}
              </PaginationLink>
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationLink size='default' isActive>
              {page}
            </PaginationLink>
          </PaginationItem>

          {page < totalPages && (
            <PaginationItem>
              <PaginationLink size='default' onClick={() => setPage(page + 1)}>
                {page + 1}
              </PaginationLink>
            </PaginationItem>
          )}

          {page < totalPages - 2 && <PaginationEllipsis />}

          {page < totalPages - 1 && (
            <PaginationItem>
              <PaginationLink size='default' onClick={() => setPage(totalPages)}>
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          )}

          {data?.meta.hasNextPage && (
            <PaginationItem>
              <PaginationNext onClick={() => setPage((p) => Math.min(totalPages, p + 1))} size='default' />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  )
}
