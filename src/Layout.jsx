import NavBar from './components/NavBar';
import SideBar from './components/SideBar';
import  { useState } from 'react'
import { Outlet } from 'react-router-dom';
function Layout() {

  }
  return (
    <>
    <div className='md:flex '>
     <SideBar />
     
     <main className='w-full bg-gray-300 dark:bg-gray-800 dark:text-white ' >
      <NavBar/>
        <Outlet />
     </main>
     </div>
    </>
  )
}

export default Layout
