import { useEffect, useState } from "react";

function Donation() {
  const [donationData, setDonationData] = useState([
    {
      id: 1,
      donorName: "Jack",
      amount: "$100",
      purpose: "Needy people",
      date: "2023-01-01",
    },
    {
      id: 2,
      donorName: "Ava",
      amount: "$50",
      purpose: "Medical help",
      date: "2023-01-01",
    },
  ]);
  const [formData, setFormData] = useState({
    id: "",
    donorName: "",
    amount: "",
    purpose: "",
    date: "",
  });
  const [isEditing, setIsEditing] = useState(false);
   const [mode ,setMode] = useState('light')
  useEffect(() => {
    const storedData = localStorage.getItem("donationData");
    if (storedData) {
      setDonationData(JSON.parse(storedData));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      handleUpdate();
      setIsEditing(false);
    } else {
      if (
        !formData.id ||
        !formData.donorName ||
        !formData.amount ||
        !formData.purpose ||
        !formData.date
      ) {
        alert("Please fill all the fields");
      }
      if(e.target.value === donationData.id){
      alert('Donation with this ID already exists')
      return
    }
      setDonationData([...donationData, formData]);
      localStorage.setItem(
        "donationData",
        JSON.stringify([...donationData, formData]),
      );
      setFormData({
        id: "",
        donorName: "",
        amount: "",
        purpose: "",
        date: "",
      });
    }
  };
  const handleEdit = (id) => {
    const donationToEdit = donationData.find((donation) => donation.id === id);
    if (donationToEdit) {
      setFormData(donationToEdit);
      setIsEditing(true);
    }
  };
  const handleUpdate = () => {
    const updatedDonations = donationData.map((donation) =>
      donation.id === formData.id ? formData : donation,
    );

    setDonationData(updatedDonations);

    localStorage.setItem("donationData", JSON.stringify(updatedDonations));
    setFormData({
      id: "",
      donorName: "",
      amount: "",
      purpose: "",
      date: "",
    });
  };
  const handleDelete = (id) => {
    const data = donationData.filter((donation) => donation.id !== id);
    setDonationData(data);
    localStorage.setItem("donationData", JSON.stringify(data));
  };

  const toggleMode = () =>{
    setMode(mode === 'light' ?'dark ' :'light')
   
  }
  return (
    <>
      <main className=" ml-4 h-100vh" className={
      mode === 'light'
        ? 'bg-gray-200 text-black'
        : 'bg-gray-800 text-gray-200 '
    }>
        <h2 className="text-center font-bold text-2xl">Donation Management</h2>
        <h3 className="font-bold">Records:</h3>
        <section className="flex justify-center">
        <table className=" bg-gray-100 rounded-2xl w-2/4 mt-4 shadow-2xl shadow-gray-600" className={
      mode === 'light'
        ? 'bg-gray-100 text-black'
        : 'bg-gray-800 text-gray-200 '
    }>
          <thead>
            <tr className="head   ">
              <th>ID</th>
              <th>Donor Name</th>
              <th>Amount</th>
              <th>Purpose</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody className="p-4 m-3">
            {donationData.map((donation) => (
              <tr key={donation.id} className="p-4">
                <td className="p-2">{donation.id}</td>
                <td className="p-2 text-center">{donation.donorName}</td>
                <td className="p-2">{donation.amount}</td>
                <td className="p-2 text-center">{donation.purpose}</td>
                <td className="p-2">{donation.date}</td>
                <td>
                  <button
                    className="p-1 m-1 text-gray-200 rounded-lg border-2 border-sky-300 bg-sky-500 hover:bg-sky-300 cursor-pointer"
                    onClick={() => handleEdit(donation.id)}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className="p-1 m-1 text-gray-200 rounded-lg border-2 border-red-300 bg-red-500 hover:bg-red-300 cursor-pointer"
                    onClick={() => handleDelete(donation.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </section>
        <h3 className="font-bold mt-4">Add New Donation:</h3>
        <form
          onSubmit={handleSubmit}
          className="w-full flex justify-center flex-1"
        >
          <div className="w-full flex items-center flex-col gap-4 mt-4 ">
            <label htmlFor="id">ID:</label>
            <input
              type="text"
              id="id"
              name="id"
              value={formData.id}
              onChange={handleChange}
              className="w-1/2 p-2 border-2 border-gray-400 bg-gray-100 outline-0"
            />

            <label htmlFor="donorName">Donor Name:</label>
            <input
              type="text"
              id="donorName"
              name="donorName"
              value={formData.donorName}
              onChange={handleChange}
              className="w-1/2 p-2 border-2 border-gray-400 bg-gray-100 outline-0"
            />
            <label htmlFor="amount">Amount:</label>
            <input
              type="text"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="w-1/2 p-2 border-2 border-gray-400 bg-gray-100 outline-0 mb-4"
            />
          </div>
          <div className="w-full flex items-center flex-col gap-4 mt-4">
            <label htmlFor="purpose">Purpose:</label>
            <input
              type="text"
              id="purpose"
              name="purpose"
              value={formData.purpose}
              onChange={handleChange}
              className="w-1/2 p-2 border-2 border-gray-400 bg-gray-100 outline-0"
            />

            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-1/2 p-2 border-2  border-gray-400 bg-gray-100 outline-0"
            />

            <button
              type="submit"
              className="border-2 border-blue-500 bg-blue-300 p-3 hover:bg-blue-200 "
            >
              Add Donation
            </button>
          </div>
        </form>
         <button onClick={toggleMode}>
          {mode === 'light' ? 'Dark Mode' : 'Light Mode'}
        </button>
      </main>
    </>
  );
}

export default Donation;
