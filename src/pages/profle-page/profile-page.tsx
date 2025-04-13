import { Header } from '@/widgets/header'

import { AppLayout } from '@/components/ui/app-layout'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { TABS, TABS_PANEL } from './constants/profile-constants'

export const ProfilePage = () => {
  return (
    <div className='background-gradient min-h-dvh'>
      <Header />
      <AppLayout className='pt-4'>
        <Tabs defaultValue={TABS[0].value}>
          <TabsList className='w-full'>
            {TABS.map((tab, index) => (
              <TabsTrigger
                className={`${index === TABS.length - 1 ? 'bg-foreground text-text-invert' : ''}`}
                key={tab.id}
                value={tab.value}
              >
                {tab.title}
              </TabsTrigger>
            ))}
          </TabsList>
          {TABS_PANEL.map((panel) => (
            <TabsContent key={panel.id} value={panel.value}>
              {panel.component}
            </TabsContent>
          ))}
        </Tabs>
      </AppLayout>
    </div>
  )
}
