import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout'
import Home from './pages/home/Home';
import Dashboard from './pages/dashboard/Dashboard';
import Beneficiery from './pages/dashboard/tabs/Beneficiery';
import Donation from './pages/dashboard/tabs/Donation';
import Event from './pages/dashboard/tabs/Event';
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />  
            <Route path="/" element={<Layout />} >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/beneficiery" element={<Beneficiery />} />
            <Route path="/donation" element={<Donation />} />
            <Route path="/event" element={<Event />} />
          </Route>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
