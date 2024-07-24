// src/components/AppointmentForm.jsx
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const departments = [
  { name: 'Cardiology', doctors: ['Dr. Smith', 'Dr. Jones'] },
  { name: 'Neurology', doctors: ['Dr. Taylor', 'Dr. Brown'] },
  { name: 'Oncology', doctors: ['Dr. Johnson', 'Dr. Lee'] },
  // Add more departments and doctors as needed
];

const AppointmentForm = () => {
  const navigate = useNavigate()
  useEffect(() => {
    const token = localStorage.getItem('patienttoken');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);


  
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    nic: '',
    dob: '',
    gender: '',
    appointmentdate: '',
    doctordepartment: '',
    doctorname: '',
    hasvisited: false,
    address: '',
  });

  const [selectedDepartment, setSelectedDepartment] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      });
      const data = await response.json();
      if (response.ok) {
         toast.success(data.message);
         setFormData("")
         navigate("/")
      } else {
        toast.error(`Error: ${data.message}`);
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-6 p-6 bg-white rounded-lg shadow-md">
      <Link to='/'><button className='text-2xl font-bold mb-2 hover:text-gray-800'>{"<<Back"}</button></Link>
      <h2 className="text-2xl font-bold text-cyan-700 mb-6">Create Appointment</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="md:flex md:space-x-4">
          <div className="w-full md:flex-1">
            <label htmlFor="firstname" className="block text-gray-700">First Name</label>
            <input
              type="text"
              name="firstname"
              placeholder="First Name"
              value={formData.firstname}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="w-full md:flex-1">
            <label htmlFor="lastname" className="block text-gray-700">Last Name</label>
            <input
              type="text"
              name="lastname"
              placeholder="Last Name"
              value={formData.lastname}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </div>
        <div className="md:flex md:space-x-4">
          <div className="w-full md:flex-1">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="w-full md:flex-1">
            <label htmlFor="phone" className="block text-gray-700">Phone</label>
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </div>
        <div className="md:flex md:space-x-4">
          <div className="w-full md:flex-1">
            <label htmlFor="nic" className="block text-gray-700">NIC</label>
            <input
              type="text"
              name="nic"
              placeholder="NIC"
              value={formData.nic}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="w-full md:flex-1">
            <label htmlFor="dob" className="block text-gray-700">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </div>
        <div className="w-full">
          <label htmlFor="gender" className="block text-gray-700">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="w-full">
          <label htmlFor="appointmentdate" className="block text-gray-700">Appointment Date</label>
          <input
            type="date"
            name="appointmentdate"
            value={formData.appointmentdate}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="w-full">
          <label htmlFor="doctordepartment" className="block text-gray-700">Doctor Department</label>
          <select
            name="doctordepartment"
            value={formData.doctordepartment}
            onChange={(e) => {
              handleChange(e);
              setSelectedDepartment(e.target.value);
            }}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select Department</option>
            {departments.map((department, index) => (
              <option key={index} value={department.name}>
                {department.name}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full">
          <label htmlFor="doctorname" className="block text-gray-700">Doctor Name</label>
          <select
            name="doctorname"
            value={formData.doctorname}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            disabled={!selectedDepartment}
          >
            <option value="">Select Doctor</option>
            {selectedDepartment &&
              departments
                .find((department) => department.name === selectedDepartment)
                .doctors.map((doctor, index) => (
                  <option key={index} value={doctor}>
                    {doctor}
                  </option>
                ))}
          </select>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            name="hasvisited"
            checked={formData.hasvisited}
            onChange={handleChange}
            className="mr-2"
          />
          <label htmlFor="hasvisited" className="text-gray-700">Has visited before</label>
        </div>
        <div className="w-full">
          <label htmlFor="address" className="block text-gray-700">Address</label>
          <textarea
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AppointmentForm;
