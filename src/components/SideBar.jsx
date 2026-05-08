import { NavLink } from "react-router-dom";
import { useState } from "react";
function SideBar() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  return (
    <>
     <aside className="w-1/4 bg-sky-800 min-h-screen">
      <h2 className="text-xl text-gray-500 p-2">Menu</h2>
       <ul className="flex-col gap-4 p-4 m-4 text-2xl font-semibold text-gray-400  ">
      <li className={`hover:bg-blue-200 hover:text-gray-700 ${
    activeTab === 'Home' ? "bg-blue-500 text-white" : ""
  }`}><NavLink to='/'  onClick={() => setActiveTab('Home')}>Home</NavLink></li>
        <li className={`hover:bg-blue-200 hover:text-gray-700 ${
    activeTab === 'Dashboard' ? "bg-blue-500 text-white" : ""
  }`}><NavLink to='/dashboard' onClick={() => setActiveTab('Dashboard')}>Dashboard</NavLink></li>
        <li className={`hover:bg-blue-200 hover:text-gray-700 ${
    activeTab === 'Beneficiery' ? "bg-blue-500 text-white" : ""
  }`}><NavLink to='/beneficiery' onClick={() => setActiveTab('Beneficiery')}>Beneficiery</NavLink></li>
        <li className={`hover:bg-blue-200 hover:text-gray-700 ${
    activeTab === 'Donation' ? "bg-blue-500 text-white" : ""
  }`}><NavLink to='/donation' onClick={() => setActiveTab('Donation')}>Donation</NavLink></li>
        <li className={`hover:bg-blue-200 hover:text-gray-700 ${
    activeTab === 'Event' ? "bg-blue-500 text-white" : ""
  }`}><NavLink to='/event' onClick={() => setActiveTab('Event')}>Event</NavLink></li>
       </ul>
     </aside>
    </>
  )
}

export default SideBar