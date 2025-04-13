import { Swiper, SwiperSlide } from 'swiper/react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { CardServices } from '@/widgets/card-services'

import 'swiper/css'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { TEXT } from '@/consts/text'

import What from '@/assets/imgs/what.png'

import { setIsDark } from '@/utils/redux/theme-slice'
import { useGetServices } from '@/utils/api/hooks/services/use-get-services'
import { ROUTES } from '@/consts/routes'

export const SliderServices = () => {
  const { data: allServices } = useGetServices()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleInstructions = () => {
    navigate(ROUTES.INSTRUCTIONS)
  }

  const handleService = (id?: number) => {
    if (id) {
      dispatch(setIsDark(false))
      navigate(`/app/${id}`)
    }
  }

  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      slidesPerView={4}
      spaceBetween={16}
      autoplay={{ delay: 3000 }}
      pagination={{
        el: '.my-pagination',
        clickable: true,
      }}
    >
      <SwiperSlide>
        <CardServices title={TEXT.WHAT_PAWS} image={What} handleLink={handleInstructions} />
      </SwiperSlide>
      {allServices &&
        allServices.length > 0 &&
        allServices.map((slide) => (
          <SwiperSlide key={slide.id}>
            <CardServices title={slide.name} image={slide.logo_url} handleService={handleService} id={slide.id} />
          </SwiperSlide>
        ))}

      <div className={`my-pagination relative flex justify-center pt-2`} />
    </Swiper>
  )
}
