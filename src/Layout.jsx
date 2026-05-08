import NavBar from './components/NavBar';
import SideBar from './components/SideBar';
import  { useState } from 'react'
import { Outlet } from 'react-router-dom';
function Layout() {
  const [mode ,setMode] = useState('light')
   const toggleMode = () =>{
    setMode(mode === 'light' ?'dark ' :'light')
   
  }
  return (
    <>
    <div className='md:flex '>
     <SideBar />
     
     <main className='w-full bg-gray-200 ' >
      <NavBar/>
        <Outlet />
     </main>
     </div>
    </>
  )
}

export default Layout
