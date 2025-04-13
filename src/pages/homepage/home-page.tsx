import { Link } from 'react-router-dom'

import { ChangeEvent, useEffect, useState } from 'react'
import { useExpand, useWebApp } from '@vkruglikov/react-telegram-web-app'

import bgStart from '@/assets/imgs/bg_home_page.webp'

import bird from '@/assets/imgs/bird.svg'
import { useGetLeaders } from '@/utils/api/hooks/user/use-get-leaders'
import TableRang from './ui/table-rang/table-rang'
import { Leader } from '@/types/api'
import { Input } from '@/components/ui/input'

export const HomePage = () => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null)
  const WebApp = useWebApp()
  const [_isExpanded, expand] = useExpand()

  const [allLeaders, setAllLeaders] = useState<Leader[]>([])
  const [filteredLeaders, setFilteredLeaders] = useState<Leader[]>([])

  const { data: leaders } = useGetLeaders()

  useEffect(() => {
    if (leaders) {
      setAllLeaders(leaders)
      setFilteredLeaders(leaders) // Устанавливаем начальное состояние для отфильтрованных лидеров
    }
  }, [leaders])

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

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value.toLocaleLowerCase()

    const filtered = allLeaders.filter((item) => item.username.toLocaleLowerCase().includes(value))

    setFilteredLeaders(filtered)
    console.log('Filtered leaders:', filtered)
  }

  return (
    <>
      <div
        style={{
          height: '100dvh',
          width: '100vw',
          position: 'fixed',
          top: '0',
          backgroundImage: `url(${bgStart})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      ></div>
      <div
        style={{
          position: 'relative',
          backgroundColor: 'transparent',
          left: '50%',
          transform: 'translateX(-50%)',
          boxShadow: 'none',
        }}
        className={`table-rang overflow-y-auto' bg-red relative flex h-screen w-full max-w-md flex-1 flex-col bg-indigo-950 shadow-lg`}
      >
        {/* Game header */}

        <div
          className='h-min-[100vh] relative z-30 flex flex-1 flex-col px-5'
          style={{ position: 'relative', backgroundColor: 'transparent', left: '50%', transform: 'translateX(-50%)' }}
        >
          <div className={`flex justify-between ${isMobile ? 'mt-20' : 'mt-11'} mb-12}`}>
            <div className='h-10 w-10'></div>
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
          <div className='mb-5'>
            <label
              htmlFor='leaderSearch'
              className='mb-2 block'
              style={{
                color: 'white',
                fontFamily: 'futurespore_cyrillicregular',
              }}
            >
              Поиск по имени
            </label>
            <Input id='leaderSearch' onChange={(event) => handleOnChange(event)} placeholder='Введите имя' />
          </div>

          {/* <Button
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
        </Button> */}

          {filteredLeaders && filteredLeaders.length > 0 && (
            <>
              <p className='mb-2 text-center font-bold uppercase leading-none text-white'>рейтинг игроков</p>
              <TableRang leaders={filteredLeaders} />
            </>
          )}
        </div>
      </div>
    </>
  )
}
