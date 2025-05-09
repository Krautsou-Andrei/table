import { Leader } from '@/types/api'
import TableRow from '../table-row/table-row'

interface TableRangProps {
  leaders: Leader[]
}

export default function TableRang({ leaders }: TableRangProps) {
  const allUsers = leaders?.sort((a, b) => a.place - b.place)
  return (
    <div className='w-full overflow-hidden rounded-2xl'>
      <div className='flex flex-col gap-[2px]'>
        {allUsers && allUsers.length > 0 ? (
          allUsers.map((user, index) => {
            return (
              <div key={user.id}>
                <TableRow
                  number={index + 1}
                  isUser={false}
                  score={user.score}
                  contact={user.username || user.telegramId}
                />
              </div>
            )
          })
        ) : (
          <div className='text-center text-white'>Пусто</div>
        )}
      </div>
    </div>
  )
}
