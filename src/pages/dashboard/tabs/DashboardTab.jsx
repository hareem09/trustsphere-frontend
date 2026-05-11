import { useState,useEffect } from "react";
import Beneficiery from "./Beneficiery";
import Chart from "../../../components/BarChartComponent";

function DashboardTab() {
  const [storedDonationData, setStoredDonationData] = useState([]);
  const [storedBeneficieryData, setStoredBeneficieryData] = useState([]);
  const [totalAmount,setTotalAmount] = useState(0);
  const [activeBenficiery,setActiveBeneficiery] = useState(0)
  const [storedEventData,setStoredEventData]=useState([]);
  const [futureEvents,setFutureEvents]=useState([]);
  
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
    
 
  return ( 
    <>
    <main className="md:w-[98%] bg-gray-300  dark:bg-gray-800 text-black dark:text-white" >
      
      <h1 className="text-gray-500  dark:text-white text-3xl m-2">Dashboard</h1>
      <button></button>
      <section className="w-full flex justify-between gap-4 m-4 h-1/2">
      <section className="w-2/5 shadow-2xl shadow-gray-600 border-2 border-gray-200 rounded-2xl bg-white  dark:bg-gray-800 text-black dark:text-white h-48 flex-col gap-4 flex items-center justify-center">
      <h2>Total Donations: </h2>
      <h3 className="text-5xl text-center">${totalAmount}</h3>
      </section>
      <section className="w-2/5 shadow-2xl shadow-gray-600 border-2 border-gray-200 rounded-2xl bg-white  dark:bg-gray-800 text-black dark:text-white h-48 flex-col gap-4 flex items-center justify-center">
      <h2>Active Beneficiery:</h2>
      <h3 className="text-5xl text-center">{activeBenficiery}</h3>
      </section>
      <section className="w-2/5 shadow-2xl shadow-gray-600 border-2 border-gray-200 rounded-2xl bg-white  dark:bg-gray-800 text-black dark:text-white h-48 flex-col gap-4 flex items-center justify-center">
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
     
    </main>
    </>
  )
}

export default DashboardTab
