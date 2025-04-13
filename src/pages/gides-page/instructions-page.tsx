import { useNavigate } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'

import { SlideOne } from './ui/slide-one'
import { SlideThree } from './ui/slide-three'
import { SlideTwo } from './ui/slide-two'

import { AppIcon } from '@/components/ui/app-icon'
import { Button } from '@/components/ui/button'

import { TEXT } from '@/consts/text'
import { formatDateDots } from '@/utils/formatDate'

import 'swiper/css'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

export const InstructionsPage = () => {
  const navigate = useNavigate()

  const currentDate = new Date()
  const date = formatDateDots(currentDate)

  return (
    <main className='bg-background-invert min-h-dvh'>
      <div className='px-8 pb-8 pt-2'>
        <div className='mb-8 flex items-center justify-between px-4'>
          <div> {date}</div>
          <div> 100%</div>
        </div>
        <div className='flex items-center justify-between'>
          <Button
            variant={'fit'}
            size={'fit'}
            onClick={() => {
              console.log("slide")
              navigate(-1)
            }}
          >
            <AppIcon name='icon/arrow-right' />
          </Button>
          <h1 className='text-sm font-bold uppercase leading-[122%]'>{TEXT.WHAT_PAWS}</h1>
        </div>
      </div>
      <div className='relative'>
        <div className='myPagination mb-0 flex justify-center gap-1 px-8' />

        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          slidesPerView={1}
          spaceBetween={16}
          autoplay={{ delay: 3000 }}
          pagination={{
            el: '.myPagination',
            clickable: true,
            renderBullet: function (_index, className) {
              return `<span class=" flex-1 h-0.5 ${className}" ></span>`
            },
          }}
        >
          <SwiperSlide>
            <SlideOne />
          </SwiperSlide>
          <SwiperSlide>
            <SlideTwo />
          </SwiperSlide>
          <SwiperSlide>
            <SlideThree />
          </SwiperSlide>
        </Swiper>
      </div>
    </main>
  )
}
