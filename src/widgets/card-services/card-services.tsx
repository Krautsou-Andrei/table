interface CardServicesProps {
  title: string
  image: string
  id?: number
  handleService?: (id?: number) => void
  handleLink?: () => void
}

import catSearch from '@/assets/imgs/cat_serach.png'

export const CardServices = ({ title, image, handleService, id, handleLink }: CardServicesProps) => {
  return (
    <div
      className='flex aspect-square w-full cursor-pointer flex-col items-center gap-1'
      onClick={() => (handleService && id ? handleService(id) : handleLink && handleLink())}
    >
      {image ? (
        <img className='aspect-square h-full min-h-[88px] w-full rounded-2xl' src={image} alt='' />
      ) : (
        <img className='aspect-square h-full min-h-[88px] w-full rounded-2xl' src={catSearch} alt='' />
      )}

      <span className='text-center text-[10px] uppercase'>{title}</span>
    </div>
  )
}
