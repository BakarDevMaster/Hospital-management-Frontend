// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const MessageForm = () => {
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      firstname,
      lastname,
      email,
      phone,
      message
    };

    if (!firstname || !lastname || !email || !phone || !message) {
      toast.error("All fields are required.");
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/sendmessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
       credentials:'include'
      });

      const data = await response.json();
       console.log(data);
      if(!data){
        toast.error(data.message);
        return;
      }


      if (!data.success) {
        toast.error(`${data.message}`);
      } else {
        toast.success(data.message);
        setFirstName('');
        setLastName('');
        setEmail('');
        setPhone('');
        setMessage('');
      }
    } catch (error) {
      console.log('Error:', error);
      toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex justify-center my-10 items-center min-h-screen bg-white">
      <form onSubmit={handleSubmit} className="w-full max-w-lg lg:max-w-3xl p-8 my-4 md:px-12 rounded-2xl ">
        <div className="flex mb-4">
          <h1 className="font-bold uppercase text-5xl">
            Send us a <br /> message
          </h1>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5">
          <input
            className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="First Name*"
            value={firstname}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Last Name*"
            value={lastname}
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
            type="email"
            placeholder="Email*"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
            type="number"
            placeholder="Phone*"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="my-4">
          <textarea
            placeholder="Message*"
            className="w-full h-32 bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <div className="my-2 w-1/2 lg:w-1/4">
          <button
            type="submit"
            className="px-10 py-5 uppercase text-white text-xs font-semibold tracking-px bg-cyan-600 rounded-md relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-full h-full bg-cyan-500 transform -translate-x-full group-hover:translate-x-0 transition ease-in-out duration-500"></div>
            <span className="relative z-10">Send message</span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default MessageForm;
