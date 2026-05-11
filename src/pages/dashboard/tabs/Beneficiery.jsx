import { useState, useEffect } from "react";
function Beneficiery() {
  const [beneficieryData, setBeneficieryData] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    category: "",
    supportType: "",
    active:''
  });
  const [isEditing, setIsEditing] = useState(false);
  
  useEffect(() => {
    const storedData = localStorage.getItem("beneficieryData");
    if (storedData) {
      setBeneficieryData(JSON.parse(storedData));
    }
  }, [],[beneficieryData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      handleUpdate();
      setIsEditing(false);
    } else {
      if (
        !formData.id ||
        !formData.name ||
        !formData.category ||
        !formData.supportType
      ) {
        alert("Please fill in all fields");
        return;
      }
      // if (e.target.value === beneficieryData.id) {
      //   alert("Beneficiery with this ID already exists");
      //   return;
      // }
      const newData = [...beneficieryData, formData];
      setBeneficieryData(newData);
      localStorage.setItem("beneficieryData", JSON.stringify(newData));
      setFormData({
        id: "",
        name: "",
        category: "",
        supportType: "",
        active:''
      });
    }
  };

  const handleEdit = (id) => {
    const beneficieryToEdit = beneficieryData.find(
      (beneficiery) => beneficiery.id === id,
    );
    if (beneficieryToEdit) {
      setFormData(beneficieryToEdit);
      setIsEditing(true);
    }
  };

  const handleUpdate = () => {
    const updateData = beneficieryData.map((beneficiery) =>
      beneficiery.id === formData.id ? formData : beneficiery,
    );
    setBeneficieryData(updateData);
    localStorage.setItem("beneficieryData", JSON.stringify(updateData));
      setFormData({
        id: "",
        name: "",
        category: "",
        supportType: "",
        active: ""
      });
  };

  const handleDelete = (id) => {
    const filteredData = beneficieryData.filter(
      (beneficiery) => beneficiery.id !== id,
    );
    setBeneficieryData(filteredData);
    localStorage.setItem("beneficieryData", JSON.stringify(filteredData));
  };
  
  return (
    <>
      <main className="md:ml-4  min-h-5/6  bg-gray-300 dark:bg-gray-800 text-black dark:text-white">
        <h2 className="text-center font-bold text-2xl">
          Beneficiery Management
        </h2>
        <h3 className="font-bold">Records:</h3>
        <section className=" flex md:justify-center">
          <table className="text-sm md:text-lg rounded-2xl md:w-2/4 w-2/6 mt-4 shadow-2xl shadow-gray-600 bg-gray-300 dark:bg-gray-800 text-black dark:text-white">
            <thead >
              <tr className="head   ">
                <th>ID</th>
                <th>Beneficiery Name</th>
                <th>Category</th>
                <th>Support Type</th>
                <th>isActive</th>
              </tr>
            </thead>
            <tbody className="md:p-4 md:m-3" >
              {beneficieryData.map((beneficiery) => (
                <tr key={beneficiery.id} className="md:p-4">
                  <td className="md:p-2">{beneficiery.id}</td>
                  <td className="md:p-2 text-center">{beneficiery.name}</td>
                  <td className="md:p-2">{beneficiery.category}</td>
                  <td className="md:p-2 text-center">{beneficiery.supportType}</td>
                  <td className="md:p-2">{beneficiery.active}</td>
                  <td>
                    <button
                      className="md:p-1 md:m-1 text-gray-200 rounded-lg border-2 border-sky-300 bg-sky-500 hover:bg-sky-300 cursor-pointer"
                      onClick={() => handleEdit(beneficiery.id)}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      className="md:p-1 md:m-1 text-gray-200 rounded-lg border-2 border-red-300 bg-red-500 hover:bg-red-300 cursor-pointer"
                      onClick={() => handleDelete(beneficiery.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <h3 className="font-bold mt-4">Add New Beneficiery:</h3>
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

            <label htmlFor="Name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-1/2 p-2 border-2 border-gray-400 bg-gray-100 outline-0"
            />
          
          
            <label htmlFor="category">Category:</label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-1/2 p-2 border-2 border-gray-400 bg-gray-100 outline-0 mb-4"
            />
            </div>
            <div className="md:w-1/2 flex items-center flex-col gap-4 mt-4">
            <label htmlFor="purpose">Support Type:</label>
            <input
              type="text"
              id="supportType"
              name="supportType"
              value={formData.supportType}
              onChange={handleChange}
              className="w-1/2 p-2 border-2 border-gray-400 bg-gray-100 outline-0"
            />
              <label htmlFor="active">isActive:</label>
            <input
              type="boolean"
              id="active"
              name="active"
              value={formData.active}
              onChange={handleChange}
              className="w-1/2 p-2 border-2 border-gray-400 bg-gray-100 outline-0"
            />
          </div>
          <div className="md:w-1/2 flex items-center flex-col gap-4 mt-4">
          <button
            type="submit"
            className="border-2 border-blue-500 bg-blue-300 p-3 hover:bg-blue-200 "
          >
            Add Beneficiery
          </button>
          </div>
        </form>
        
      </main>
    </>
  );
}

export default Beneficiery;
