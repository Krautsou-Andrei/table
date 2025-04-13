import instructionsTwo from '@/assets/imgs/instructions_2.png'
export const SlideTwo = () => {
  return (
    <div className='px-8 pb-[102px] pt-8'>
      <div className='mb-8'>
        <div className='text-text-secondary text-[32px] font-bold uppercase leading-[122%]'>Активность</div>
        <div className='mb-8 text-[32px] font-bold uppercase leading-[122%]'>= Привилегии</div>
        <div className='font-bold uppercase leading-[122%]'>высокий рейтинг открывает </div>
        <div className='font-bold uppercase leading-[122%]'>новые возможности:</div>
      </div>
      <div className='text-text-invert bg-background-select box-shadow-form mb-4 w-full rounded-2xl p-4 font-bold uppercase leading-[122%]'>
        <div className=''>место в списке самых активных </div>
        <div className=''>участников комьюнити</div>
      </div>
      <div className='text-text-invert bg-background-card box-shadow-form mb-4 w-full rounded-2xl p-4 font-bold uppercase leading-[122%]'>
        <div className=''>уникальные скидки и предложения </div>
        <div className=''>от наших партнеров</div>
      </div>
      <div className='text-text-invert bg-background-button box-shadow-form mb-4 w-full rounded-2xl p-4 font-bold uppercase leading-[122%]'>
        <div className=''>авторитет среди других </div>
        <div className=''>пользователей kotigo </div>
      </div>
      <img className='aspect-[366/235] min-h-[235px] w-full rounded-2xl object-cover' src={instructionsTwo} alt='' />
    </div>
  )
}
