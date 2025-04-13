import { Button } from '@/components/ui/button'
import * as ScrollArea from '@radix-ui/react-scroll-area'

import { useParams } from 'react-router-dom'

import { Spinner } from '@/components/ui/spinner.tsx'

import { useWebApp } from '@vkruglikov/react-telegram-web-app'
import useBackButton from '@/utils/hooks/useBackButton.ts'

import { useGetService } from '@/utils/api/hooks/services/use-get-service'
import { useSelector } from 'react-redux'
import { RootState } from '@/utils/redux/store'

export default function AppPage() {
  const { id } = useParams()
  const webapp = useWebApp()
  const theme = useSelector((store: RootState) => store.theme)

  useBackButton()

  const { data: appData, isLoading } = useGetService(id!, Boolean(id))

  if (isLoading) {
    return (
      <div className='flex h-[100vh] w-[100vw] items-center justify-center'>
        <Spinner />
      </div>
    )
  }

  return (
    <div
      className={`font-custom app-card mx-auto min-h-[100dvh] w-full max-w-[600px] space-y-6 rounded-lg px-2 pb-28 pt-5 ${theme.isDark ? '' : 'bg-[var(--backgroundHeader)]'}`}
    >
      <div className='flex items-start space-x-4'>
        <div className='h-32 w-32 flex-shrink-0 overflow-hidden rounded-2xl'>
          {appData?.logo_url ? (
            <img src={appData?.logo_url} alt={`${appData?.name} icon`} className='h-full w-full object-cover' />
          ) : (
            <div className='h-full w-full bg-gray-500'></div>
          )}
        </div>
        <div className='flex h-32 min-w-0 flex-1 flex-col justify-between space-y-2'>
          <div>
            <h1 className={`truncate text-2xl font-bold ${theme.isDark ? 'text-white' : ''} `}>{appData?.name}</h1>
            <p className={`line-clamp-2 text-sm ${theme.isDark ? 'text-gray-300' : ''}`}>{appData?.shortcode}</p>
          </div>
          <div className='flex justify-between align-middle'>
            <Button
              className={`text-md w-[100px] rounded-2xl ${theme.isDark ? 'bg-purple-700' : ''} `}
              onClick={() => {
                if (appData) {
                  if (appData.url.includes('t.me')) webapp.openTelegramLink(appData.url)
                  else webapp.openLink(appData.url)
                }
              }}
            >
              Открыть
            </Button>
          </div>
        </div>
      </div>
      <div className='space-y-2'>
        <ScrollArea.Root className='w-full' type='scroll'>
          <ScrollArea.Viewport className='w-full overflow-x-scroll'>
            <div className='flex space-x-4 pb-4'>
              {appData?.screenshots.map((screenshot, index) => (
                <img
                  key={index}
                  src={screenshot}
                  alt={`${appData?.name} screenshot ${index + 1}`}
                  className='h-96 w-48 rounded-lg object-cover'
                />
              ))}
            </div>
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar
            className={`flex touch-none select-none ${theme.isDark ? 'bg-[#212121]' : 'bg-[var(--backgroundHeader)]'} p-0.5 transition-colors duration-150 ease-out ${theme.isDark ? 'hover:bg-gray-800' : ''} data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col`}
            orientation='horizontal'
          >
            <ScrollArea.Thumb className="relative flex-1 rounded-[10px] bg-gray-600 before:absolute before:left-1/2 before:top-1/2 before:h-full before:min-h-[44px] before:w-full before:min-w-[44px] before:-translate-x-1/2 before:-translate-y-1/2 before:content-['']" />
          </ScrollArea.Scrollbar>
        </ScrollArea.Root>
      </div>

      <div className='space-y-2 pb-2'>
        <h2 className={`text-2xl font-bold  ${theme.isDark ? 'text-white' : ''} `}>описание</h2>
        <p className={`text-sm ${theme.isDark ? 'text-gray-300' : ''} `}>{appData?.description}</p>
      </div>
    </div>
  )
}
