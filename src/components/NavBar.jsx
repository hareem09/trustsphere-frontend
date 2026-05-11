import { useEffect, useState } from "react";

function NavBar() {
  const [storedDonation, setStoredDonation] = useState([]);
  const [storedBeneficiery, setStoredBeneficiery] = useState([]);
  const [storedEvent, setStoredEvent] = useState([]);
  const [mode, setMode] = useState(false);
  const [searchText, setSearchText] = useState("");

  const [filteredData, setFilteredData] = useState({
    donations: [],
    beneficiaries: [],
    events: [],
  });

  useEffect(() => {
    const donationStored = localStorage.getItem("donationData");
    if (donationStored) {
      setStoredDonation(JSON.parse(donationStored));
    }

    const beneficieryStored = localStorage.getItem("beneficieryData");
    if (beneficieryStored) {
      setStoredBeneficiery(JSON.parse(beneficieryStored));
    }

    const eventStored = localStorage.getItem("eventData");
    if (eventStored) {
      setStoredEvent(JSON.parse(eventStored));
    }
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();

    setSearchText(value);

    const filteredDonation = storedDonation.filter(
      (donation) =>
        donation.donorName?.toLowerCase().includes(value) ||
        donation.date?.toLowerCase().includes(value),
    );

    const filteredBeneficiery = storedBeneficiery.filter(
      (beneficiery) =>
        beneficiery.name?.toLowerCase().includes(value) ||
        beneficiery.category?.toLowerCase().includes(value) ||
        beneficiery.supportType?.toLowerCase().includes(value),
    );

    const filteredEvent = storedEvent.filter(
      (event) =>
        event.title?.toLowerCase().includes(value) ||
        event.date?.toLowerCase().includes(value),
    );

    setFilteredData({
      donations: filteredDonation,
      beneficiaries: filteredBeneficiery,
      events: filteredEvent,
    });
  };
  const clearSearch = () => {
    setSearchText("");
    setFilteredData({
      donations: [],
      beneficiaries: [],
      events: [],
    });
  };

 useEffect(() => {
      if (mode) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }, [mode])

  const toggleMode = () =>{
    setMode(!mode)
  }
  return (
    <>
      <nav
        className="w-full  flex justify-around items-center px-4 text-gray-800 bg-gray-300 dark:text-white dark:bg-gray-800 " >
        <div className="flex items-center gap-1">
          <input
            type="search"
            name="search"
            id="search"
            placeholder="Search..."
            className="md:w-lg p-1 rounded-2xl border-2 border-gray-300 bg-gray-100 shadow-2xl m-2 shadow-gray-400 outline-0"
            onChange={handleSearch}
            value={searchText}
          />
          <button
            onClick={clearSearch}
            className="px-3 py-1 rounded  text-gray-800 bg-gray-300 dark:text-white dark:bg-gray-800 "
          >
            Clear
          </button>
        </div>
        <button onClick={toggleMode}>
          {mode ? "Light Mode" : "Dark Mode"}
        </button>
      </nav>
      <main
        className="w-full flex justify-center gap-4
         text-gray-800 bg-gray-300 dark:text-white dark:bg-gray-800 "
      >
        {searchText ? (
          <div className="md:w-1/2 w-2/3  p-4 text-center border-2 border-gray-300 bg-gray-200 shadow-2xl shadow-gray-400 rounded-2xl">
            {filteredData.donations.length > 0 &&
              filteredData.donations.map((donation) => (
                <p key={donation.id}>
                  {donation.donorName}- {donation.amount} ({donation.purpose}) &{" "}
                  {donation.date}
                </p>
              ))}

            {filteredData.beneficiaries.length > 0 &&
              filteredData.beneficiaries.map((beneficiery) => (
                <p key={beneficiery.id}>
                  {beneficiery.name} - {beneficiery.category} (
                  {beneficiery.supportType})
                </p>
              ))}

            {filteredData.events.length > 0 &&
              filteredData.events.map((event) => (
                <p key={event.id}>
                  {event.title} - {event.date} ({event.location})
                </p>
              ))}
          </div>
        ) : (
          ""
        )}
      </main>
    </>
  );
}
export default NavBar;

