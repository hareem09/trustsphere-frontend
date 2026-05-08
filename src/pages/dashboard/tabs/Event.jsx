import { useState, useEffect } from "react";

function Event() {
  const [eventData, setEventData] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    date: "",
    location: "",
    description: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [mode ,setMode] = useState('light')
  useEffect(() => {
    const storedData = localStorage.getItem("eventData");
    if (storedData) {
      setEventData(JSON.parse(storedData));
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
        !formData.title ||
        !formData.date ||
        !formData.location ||
        !formData.description
      ) {
        alert("Please fill all the fields");
      }
      const newData = [...eventData, formData];
      setEventData(newData);
      localStorage.setItem("eventData", JSON.stringify(newData));
      setFormData({
        id: "",
        title: "",
        date: "",
        location: "",
        description: "",
      });
    }
  };

  const handleEdit = (id) => {
    const eventToEdit = eventData.find((event) => event.id === id);
    setFormData(eventToEdit);
    setIsEditing(true);
  };

  const handleUpdate = () => {
    const updatedData = eventData.map((event) =>
      event.id === formData.id ? formData : event,
    );
    setEventData(updatedData);
    localStorage.setItem("eventData", JSON.stringify(updatedData));
    setFormData({
      id: "",
      title: "",
      date: "",
      location: "",
      description: "",
    });
  };

  const handleDelete = (id) => {
    const filteredData = eventData.filter((event) => event.id !== id);
    setEventData(filteredData);
    localStorage.setItem("eventData", JSON.stringify(filteredData));
  };

  const toggleMode = () =>{
    setMode(mode === 'light' ?'dark ' :'light')
   
  }
  return(
  <>
    <main className=" ml-4 h-lvh" className={
      mode === 'light'
        ? 'bg-gray-200 text-black'
        : 'bg-gray-800 text-gray-200 '
    }>
      <h2 className="text-center font-bold text-2xl">Event Management</h2>
      <h3 className="font-bold">Records:</h3>
      <section className="flex md:justify-center">
        <table className=" text-sm md:text-lg bg-gray-100 rounded-2xl w-2/4 mt-4 shadow-2xl shadow-gray-600" className={
      mode === 'light'
        ? 'bg-gray-100 text-black'
        : 'bg-gray-800 text-gray-200 '
    }>
          <thead >
            <tr className="head   ">
              <th>ID</th>
              <th>Title</th>
              <th>Date</th>
              <th>Location</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody className="md:p-4 md:m-3">
            {eventData.map((event) => (
              <tr key={event.id} className="p-4">
                <td className="md:p-2">{event.id}</td>
                <td className="md:p-2 text-center">{event.title}</td>
                <td className="md:p-2">{event.date}</td>
                <td className="md:p-2 text-center">{event.location}</td>
                <td className="md:p-2">{event.description}</td>
                <td>
                  <button
                    className="p-1 m-1 text-gray-200 rounded-lg border-2 border-sky-300 bg-sky-500 hover:bg-sky-300 cursor-pointer"
                    onClick={() => handleEdit(event.id)}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className="p-1 m-1 text-gray-200 rounded-lg border-2 border-red-300 bg-red-500 hover:bg-red-300 cursor-pointer"
                    onClick={() => handleDelete(event.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <h3 className="font-bold mt-4">Add New Event:</h3>
      <form
        onSubmit={handleSubmit}
        className="w-full md:flex justify-center flex-wrap"
      >
        <div className="md:w-1/2 flex items-center flex-col gap-4 mt-4 ">
          <label htmlFor="id">ID:</label>
          <input
            type="text"
            id="id"
            name="id"
            value={formData.id}
            onChange={handleChange}
            className="w-1/2 p-2 border-2 border-gray-400 bg-gray-100 outline-0"
          />

          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
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
            className="w-1/2 p-2 border-2 border-gray-400 bg-gray-100 outline-0"
          />
          </div>
          <div className="md:w-1/2 flex items-center flex-col gap-4 mt-4 ">
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-1/2 p-2 border-2 border-gray-400 bg-gray-100 outline-0"
          />
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-1/2 p-2 border-2 border-gray-400 bg-gray-100 outline-0"
          />
        </div>
        <button
          type="submit"
          className="border-2 border-blue-500 bg-blue-300 p-3 hover:bg-blue-200 "
        >
          Add Event
        </button>
      </form>
       <button onClick={toggleMode}>
          {mode === 'light' ? 'Dark Mode' : 'Light Mode'}
        </button>
    </main>
</>
)
}

export default Event;
