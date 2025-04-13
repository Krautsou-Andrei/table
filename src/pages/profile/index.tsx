import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.tsx'
import MyEventsTab from '@/pages/profile/my-events-tab.tsx'
import OrganizedEventsTab from '@/pages/profile/organized-events-tab.tsx'
import { useSelector } from 'react-redux'
import { RootState } from '@/utils/redux/store.ts'
import ArchiveEventsTab from '@/pages/profile/archive-events-tab.tsx'
import useBackButton from '@/utils/hooks/useBackButton.ts'
import lapki from '@/assets/imgs/lapki.png'

function Profile() {
  const user = useSelector((state: RootState) => state.user.user)
  useBackButton()

  return (
    <div className='container pb-16'>
      <header className='flex w-full flex-row items-center justify-between'>
        <h1 className='m-4 text-2xl font-bold'>Профиль</h1>
        <div className='flex h-12 w-32 flex-row items-center justify-center rounded-l-full bg-[#6E6A6E]'>
          <span className='mr-2 text-2xl font-bold'>{user?.starsBalance}</span>
          <img src={lapki} alt='Star' width={48} height={48} />
        </div>
      </header>
      <main className='container p-4'>
        <Tabs defaultValue='my'>
          <TabsList className='w-full'>
            <TabsTrigger value='my'>Билеты</TabsTrigger>
            <TabsTrigger value='organized'>Созданные</TabsTrigger>
            <TabsTrigger value='history'>История</TabsTrigger>
          </TabsList>
          <TabsContent value='my'>
            <MyEventsTab />
          </TabsContent>
          <TabsContent value='organized'>
            <OrganizedEventsTab />
          </TabsContent>
          <TabsContent value='history'>
            <ArchiveEventsTab userId={user?.id} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

export default Profile
