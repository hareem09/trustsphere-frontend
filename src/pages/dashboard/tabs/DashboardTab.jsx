import { useState,useEffect } from "react";
import Beneficiery from "./Beneficiery";
import Chart from "../../../components/BarChartComponent";
function DashboardTab({button}) {
  const [storedDonationData, setStoredDonationData] = useState([]);
  const [storedBeneficieryData, setStoredBeneficieryData] = useState([]);
  const [totalAmount,setTotalAmount] = useState(0);
  const [activeBenficiery,setActiveBeneficiery] = useState(0)
  const [storedEventData,setStoredEventData]=useState([]);
  const [futureEvents,setFutureEvents]=useState([]);
    const [mode ,setMode] = useState('light')
  useEffect(()=>{
   const storedData = localStorage.getItem('donationData');
   if (storedData) {
     setStoredDonationData(JSON.parse(storedData));
   }
   const storedBeneficiery = localStorage.getItem('beneficieryData')
   console.log(storedBeneficiery)
   if(storedBeneficiery){
    setStoredBeneficieryData(JSON.parse(storedBeneficiery))
   }
   const storedEvent = localStorage.getItem('eventData')
   if(storedEvent){
    setStoredEventData(JSON.parse(storedEvent))
   }
  }, []);

  const totalDonations = () =>{
    const total = storedDonationData.reduce((sum, donation) => sum + parseFloat(donation.amount.replace('$', '')), 0);
    setTotalAmount(total);
  };

  useEffect(() => {
    totalDonations();
  }, [storedDonationData]);
 
   const totalAciveBeneficiery = () =>{
    const total = storedBeneficieryData.filter((beneficiery) => beneficiery.active === 'true').length
    console.log(total)
    setActiveBeneficiery(total)
   }
   useEffect(()=>{
    totalAciveBeneficiery()
   },[storedBeneficieryData])

   const upcomingEvents = () =>{
    const inFutureEvents = storedEventData.filter((event) => new Date(event.date) > new Date());
    setFutureEvents(inFutureEvents)
   }
    useEffect(()=>{
    upcomingEvents()
   },[storedEventData])

    const toggleMode = () =>{
    setMode(mode === 'light' ?'dark ' :'light')
   
  }
  return ( 
    <>
    <main className="w-[90%] min-h-100vh bg-gray-200" className={
      mode === 'light'
        ? 'bg-gray-200 text-black'
        : 'bg-gray-800 text-gray-200 '
    }>
      
      <h1 className="text-gray-500 text-3xl m-2">Dashboard</h1>
      <button></button>
      <section className="w-full flex justify-between gap-4 m-4 h-1/2">
      <section className="w-2/5 shadow-2xl shadow-gray-600 border-2 border-gray-200 rounded-2xl bg-white h-48 flex-col gap-4 flex items-center justify-center">
      <h2>Total Donations: </h2>
      <h3 className="text-5xl text-center">${totalAmount}</h3>
      </section>
      <section className="w-2/5 shadow-2xl shadow-gray-600 border-2 border-gray-200 rounded-2xl bg-white h-48 flex-col gap-4 flex items-center justify-center">
      <h2>Active Beneficiery:</h2>
      <h3 className="text-5xl text-center">{activeBenficiery}</h3>
      </section>
      <section className="w-2/5 shadow-2xl shadow-gray-600 border-2 border-gray-200 rounded-2xl bg-white h-48 flex-col gap-4 flex items-center justify-center">
      <h2>Upcoming Events: </h2>
      <h3 className="text-5xl text-center">{futureEvents.length}</h3>
      </section>
      </section>
      <section className="w-1/2 h-full m-4 shadow-2xl shadow-gray-600">
        <Chart 
        totalDonation={totalAmount}
        activeBeneficiery={activeBenficiery}
        futureEvents={futureEvents.length}
        />
      </section>
       <button onClick={toggleMode}>
          {mode === 'light' ? 'Dark Mode' : 'Light Mode'}
        </button>
    </main>
    </>
  )
}

export default DashboardTab