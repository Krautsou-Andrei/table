import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div className='min-h-[100vh]'>
      <Outlet />
    </div>
  )
}

export default Layout
