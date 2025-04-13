'use client'
interface TableRowProps {
  contact: string
  isUser: boolean
  number: number
  score: number
}

export default function TableRow({ number, isUser, score, contact }: TableRowProps) {
  return (
    <div
      className={'bg-row'}
      style={{
        display: 'flex',
        gap: '8px',
        alignItems: 'center',
        borderRadius: '20px',
        padding: '8px 20px',
        fontSize: '700',
        justifyContent: 'space-between',
        fontFamily: 'Montserrat, sans-serif',
        backdropFilter: 'blur(30px)',
      }}
    >
      <div className={`${isUser ? 'text-textColor-third' : 'text-white'} w-[60px]`}>{number}</div>
      <div
        className={`${
          isUser ? 'text-textColor-third' : 'text-white'
        } text-[14px]leading-none flex-1 items-start font-bold`}
        style={{ fontFamily: 'Montserrat, sans-serif' }}
      >
        {score} млд. км
      </div>
      <div
        className={`${
          isUser ? 'text-textColor-third' : 'text-textColor-secondary'
        } w-[70px] overflow-hidden text-ellipsis text-[14px] font-bold leading-none`}
        style={{ fontFamily: 'Montserrat, sans-serif' }}
      >
        {`@${contact}`}
      </div>
    </div>
  )
}
