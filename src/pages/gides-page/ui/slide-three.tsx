import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'

import { SLIDER_THREE } from '../constants/instructions-constant'
import { ROUTES } from '@/consts/routes'

export const SlideThree = () => {
  const navigate = useNavigate()

  return (
    <div className='px-8 pb-[102px] pt-8'>
      <div className='mb-8'>
        <div className='text-text-secondary text-[32px] font-bold uppercase leading-[122%]'>накопи лапки</div>
        <div className='text-[32px] font-bold uppercase leading-[122%]'>и Стань лидером </div>
        <div className='text-[32px] font-bold uppercase leading-[122%]'>комьюнити! </div>
      </div>
      <div className='mb-8 grid grid-cols-2 gap-4'>
        {SLIDER_THREE.map((slide) => (
          <div key={slide.id} className='bg-background-invert box-shadow-form rounded-2xl p-4'>
            <img className={`mb-4 aspect-[143/135] min-h-[135px] rounded-2xl object-cover`} src={slide.image} alt='' />
            <div className=''>
              <div className='text-sm font-bold uppercase leading-[122%]'>{slide.title}</div>
              <div className='text-sm font-bold uppercase leading-[122%]'>{slide.subTitle}</div>
            </div>
          </div>
        ))}
      </div>
      <Button
        onClick={() => {
          navigate(ROUTES.EVENTS)
        }}
      >
        К мероприятиям
      </Button>
    </div>
  )
}
