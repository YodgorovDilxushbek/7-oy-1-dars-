import React, { useState } from "react";
import logo from "./assets/logo.svg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialCustomers = [
];

function App() {
  const [customers, setCustomers] = useState(initialCustomers);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    balance: "",
    deposit: "",
    status: "ACTIVE",
    rate: "",
    description: "",
  });

  const openModal = () => setShowModal(true);
  const closeModal = () => {
    setShowModal(false);
    setFormData({ name: "", balance: "", deposit: "", status: "ACTIVE", rate: "", description: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    let isValid = true;
    toast.dismiss();

    if (!formData.name) {
      toast.error("Iltimos Ism kiritish ", {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      isValid = false;
    }

    if (!formData.balance || isNaN(formData.balance)) {
      toast.error("Iltimos balansni kiriting", {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      isValid = false;
    }

    if (!formData.deposit || isNaN(formData.deposit)) {
      toast.error("Depozit raqam va togri kiriting", {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      isValid = false;
    }

    if (!formData.rate || isNaN(formData.rate)) {
      toast.error("Iltimos Rate ni kiriting", {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      isValid = false;
    }

    if (!formData.description) {
      toast.error("Iltimos malumot kiriting", {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();

    if (isValid) {
      const newCustomer = {
        id: customers.length + 1,
        name: formData.name,
        balance: parseFloat(formData.balance),
        deposit: parseFloat(formData.deposit),
        status: formData.status,
        rate: parseFloat(formData.rate),
        description: formData.description,
      };

      setCustomers([...customers, newCustomer]);

      toast.success('Malumot qoshildi!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      closeModal();
    }
  };

  const handleDelete = (id) => {
    toast.error('Malumot ochirildi', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    const updatedCustomers = customers.filter((customer) => customer.id !== id);
    setCustomers(updatedCustomers);
  };

  return (
    <div className="container mx-auto p-6">
      <header className="flex justify-between items-center mb-6 p-4 bg-gray-200 rounded-lg shadow">
        <img src={logo} alt="Logo" className="w-12 h-12 mr-4" />
        <input
          type="text"
          placeholder="Search..."
          className="input input-bordered w-1/3"
        />
        <button onClick={openModal} className="btn btn-primary">
          Add Customer
        </button>
      </header>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Description</th>
              <th>Rate</th>
              <th>Balance (INR)</th>
              <th>Deposit (INR)</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer, index) => (
              <tr key={customer.id}>
                <th>{index + 1}</th>
                <td>{customer.name}</td>
                <td>{customer.description}</td>
                <td>{customer.rate}</td>
                <td
                  className={
                    customer.balance < 0 ? "text-red-500 font-bold" : "text-green-500 font-bold"
                  }
                >
                  {customer.balance}
                </td>
                <td>{customer.deposit}</td>
                <td>
                  <span
                    className={`badge ${customer.status === "ACTIVE" ? "badge-success" : "badge-error"}`}
                  >
                    {customer.status}
                  </span>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(customer.id)}
                    className="btn btn-sm btn-error mr-2"
                  >
                    🗑
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add New Customer</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="textarea textarea-bordered w-full"
                  rows="3"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-1">Rate</label>
                <input
                  type="text"
                  name="rate"
                  value={formData.rate}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-1">Balance (INR)</label>
                <input
                  type="text"
                  name="balance"
                  value={formData.balance}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-1">Deposit (INR)</label>
                <input
                  type="text"
                  name="deposit"
                  value={formData.deposit}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-1">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="select select-bordered w-full"
                >
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="INACTIVE">INACTIVE</option>
                </select>
              </div>

              <div className="flex justify-end gap-3">
                <button type="button" onClick={closeModal} className="btn btn-ghost">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}

export default App;
