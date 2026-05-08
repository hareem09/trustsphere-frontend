import { useNavigate } from 'react-router-dom'
import img from '../../assets/img.jpg'
import { NavLink } from "react-router-dom";
function Home() {
    const navigate = useNavigate();
  return (
    <>
     <nav className="w-full h-16 border-2 border-gray-300 flex justify-around bg-blue-300">
     <section>
        <h1 className="italic font-extrabold text-3xl p-2">TrustSphere</h1>
     </section>
     <ul className="flex gap-4 p-4">
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/dashboard">Dashboard</NavLink></li>
     </ul>
    </nav>
      <main>
        <img src={img} alt="Home" className='w-full h-screen -z-40 relative' />
         <section className='absolute top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center'>
           <h1 className='text-4xl font-bold text-white'>Welcome to TrustSphere</h1>
           <p className='text-lg text-white mt-4 tex-2xl'>Your trusted source for all things related to trust and security.</p>
            <p className='text-white mt-4 text-xl text-justify'>TrustSphere is a frontend-based Trust Organization Management System built with React. It provides a professional dashboard to manage donations, beneficiaries, and events with full CRUD functionality using local storage. The application features multi-page navigation, responsive UI, and user-friendly data handling, simulating a real-world organizational management system.
            </p>
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4' onClick={() => navigate('/dashboard')}>
              Get Started
            </button>
         </section>
      </main>
    </>
  )
}

export default Home