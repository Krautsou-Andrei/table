import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'

import { cn } from '@/lib/utils'
import { Popover, PopoverTrigger, PopoverContent } from '@radix-ui/react-popover'

import { useEffect, useState } from 'react'
import { useExpand, useWebApp } from '@vkruglikov/react-telegram-web-app'

import bgStart from '@/assets/imgs/bg_home_page.webp'
import info from '@/assets/imgs/info.svg'
import bird from '@/assets/imgs/bird.svg'
import { useGetLeaders } from '@/utils/api/hooks/user/use-get-leaders'
import TableRang from './ui/table-rang/table-rang'

export const HomePage = () => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null)
  const WebApp = useWebApp()
  const [_isExpanded, expand] = useExpand()

  const { data: leaders } = useGetLeaders()
  console.log('leaders', leaders)

  useEffect(() => {
    expand()
    try {
      WebApp.requestFullscreen()
    } catch (err) {
      console.error(err)
    }
  }, [WebApp, expand])

  useEffect(() => {
    if (typeof navigator !== 'undefined') {
      setIsMobile(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
    }
  }, [])

  return (
    <div
      className={`table-rang overflow-y-auto' bg-red relative flex h-screen w-full max-w-md flex-1 flex-col bg-indigo-950 shadow-lg`}
    >
      {/* Game header */}

      <div
        className='h-min-[100vh] relative z-30 flex flex-1 flex-col px-5'
        style={{
          backgroundImage: `url(${bgStart})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className={`flex justify-between ${isMobile ? 'mt-20' : 'mt-11'} mb-12}`}>
          <div className='h-10 w-10'>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant={'fit'} size={'fit'}>
                  <img src={info} alt={''} width={52} height={52} />
                </Button>
              </PopoverTrigger>
              <PopoverContent className={cn()} align='start'>
                {isMobile ? 'Для управления жми на экран' : 'Для управления жми пробел'}
              </PopoverContent>
            </Popover>
          </div>
          <Link to={'https://www.kp.ru/'}>
            <img src={bird} alt={''} width={52} height={52} />
          </Link>
        </div>
        <h1
          className='text-center text-[60px] leading-none text-white'
          style={{
            marginBottom: '60px',
            fontFamily: 'futurespore_cyrillicregular',
          }}
        >
          Звездный рейс с <Link to={'https://www.kp.ru/'}>KP.RU </Link>
        </h1>
        <Button
          size={'fit'}
          onClick={() => {
            // startGame()
            // startTimer()
          }}
          className='background-gradient-button rounded-full px-6 py-3 text-5xl leading-none text-white transition-colors hover:bg-purple-700'
          style={{
            marginBottom: '60px',
            fontFamily: 'futurespore_cyrillicregular',
          }}
        >
          НАЧАТЬ ИГРУ
        </Button>

        {leaders && leaders.length > 0 && (
          <>
            <p className='mb-2 text-center font-bold uppercase leading-none text-white'>рейтинг игроков</p>
            <TableRang leaders={leaders} />
          </>
        )}
      </div>
    </div>
  )
}
