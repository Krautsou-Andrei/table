import { AppIcon } from '@/components/ui/app-icon'

import instructionsOne from '@/assets/imgs/instructions_1.png'

export const SlideOne = () => {
  return (
    <div className='px-8 pb-[102px] pt-8'>
      <div>
        <div className='mb-1 font-bold uppercase leading-[122%]'>поднимай свой рейтинг —</div>
        <div className='text-text-secondary mb-8 text-[32px] font-bold uppercase leading-[122%]'>Собирай Лапки</div>
      </div>
      <div className='mb-4 w-full font-bold uppercase leading-[122%]'>
        <div className='flex gap-1'>
          <div className='text-text-third flex items-center gap-1 text-sm leading-[122%]'>
            <div className='mt-0.5'>Лапки</div>
            <AppIcon name='icon/thumbs-up' width={16} height={16} />
          </div>{' '}
          — это баллы,
        </div>
        <div> которые ты получаешь</div>
        <div> за участие в мероприятиях</div>
      </div>
      <div className='mb-4 w-full font-bold uppercase leading-[122%]'>
        <div>За каждую активность</div>
        <div className='flex gap-1'>
          ты получаешь
          <div className='text-text-third flex items-center gap-1 text-sm leading-[122%]'>
            <div className='mt-0.5'>+1</div>
            <AppIcon name='icon/thumbs-up' width={16} height={16} />
          </div>
        </div>
      </div>
      <div className='mb-8 w-full font-bold uppercase leading-[122%]'>
        <div>Чем больше Лапок накоплено, </div>
        <div>
          тем <span className='text-text-third'>выше рейтинг</span> и больше
        </div>
        <div>возможностей</div>
      </div>
      <img className='aspect-[366/361] min-h-[361px] w-full rounded-2xl object-cover' src={instructionsOne} alt='' />
    </div>
  )
}
