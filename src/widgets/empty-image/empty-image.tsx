import catSearch from '@/assets/imgs/cat_serach.png'

export const EmptyImage = () => {
  return (
    <div className='flex aspect-[295/157] h-full min-h-[157px] w-full items-center justify-center gap-2 rounded-2xl bg-[var(--backgroundHeader)] object-cover'>
      <img className='h-full rounded-2xl' src={catSearch} alt='' loading={'lazy'} />
      <div className=''>'фото нет, но активность есть)'</div>
    </div>
  )
}
