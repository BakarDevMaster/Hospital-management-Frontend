/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { context } from '../main';
import { toast } from 'react-toastify';

const Hero = ({ title, imageURL }) => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(context);
  const navigate = useNavigate();

  const toggleMobileNav = () => {
    setMobileNavOpen(!mobileNavOpen);
  };

  const handleAuthButtonClick = async () => {
    if (isAuthenticated) {
      try {
        const response = await fetch('http://localhost:4000/logoutpatient', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        const data = await response.json();
        console.log('data', data);
        if (!data.success) {
          toast.error(data.message);
          setIsAuthenticated(false);
        } else {
          toast.success(data.message);
          localStorage.removeItem('patienttoken');
          setIsAuthenticated(true);
          navigate('/login');
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      navigate('/login');
    }
  };

  return (
    <section className="overflow-hidden">
      <header className="flex items-center justify-between px-8 py-5 bg-white">
        <div className="flex items-center">
          <Link to="/" className="mr-14">
            <img
              src="/logo.png"
              alt="Logo"
              className="w-12 h-12 rounded-full bg-cyan-600 object-contain"
            />
          </Link>
          <nav className="hidden lg:block">
            <ul className="flex items-center space-x-9 text-gray-900 text-lg font-heading">
              <li>
                <Link to="/" className="hover:text-gray-700">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/appointement" className="hover:text-gray-700">
                  Appointment
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-gray-700">
                  About Us
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="flex items-center">
          <button
            onClick={handleAuthButtonClick}
            className="hidden lg:inline-block px-6 py-3 uppercase text-white text-xs font-semibold tracking-px bg-cyan-600 rounded-md relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-full h-full bg-cyan-500 transform -translate-x-full group-hover:translate-x-0 transition ease-in-out duration-500"></div>
            <span className="relative z-10">{isAuthenticated ? 'Log Out' : 'Log In'}</span>
          </button>
          <button className="lg:hidden" onClick={toggleMobileNav}>
            <svg
              className="text-gray-800"
              width="51"
              height="51"
              viewBox="0 0 56 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="56" height="56" rx="28" fill="currentColor"></rect>
              <path
                d="M37 32H19M37 24H19"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </button>
        </div>
      </header>
      <div
        className={`fixed top-0 left-0 bottom-0 w-4/6 sm:max-w-xs z-50 bg-white h-full ${
          mobileNavOpen ? 'block' : 'hidden'
        }`}
      >
        <div
          className="fixed inset-0 bg-gray-800 opacity-80"
          onClick={toggleMobileNav}
        ></div>
        <nav className="relative z-10 px-9 py-6">
          <div className="flex items-center justify-between mb-8">
            <Link to="/">
              <img src={imageURL} alt="Logo" className="w-24 h-24 object-contain" />
            </Link>
            <button onClick={toggleMobileNav}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 18L18 6M6 6L18 18"
                  stroke="#111827"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </button>
          </div>
          <ul className="space-y-12 font-heading text-lg text-gray-900">
            <li>
              <Link to="/" className="hover:text-gray-700">
                Home
              </Link>
            </li>
            <li>
              <Link to="/appointement" className="hover:text-gray-700">
                Appointment
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-gray-700">
                About Us
              </Link>
            </li>
          </ul>
          <button
            onClick={handleAuthButtonClick}
            className="mt-8 px-10 py-5 w-full uppercase text-white text-xs font-semibold tracking-px bg-cyan-600 rounded-md relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-full h-full bg-cyan-500 transform -translate-x-full group-hover:translate-x-0 transition ease-in-out duration-500"></div>
            <span className="relative z-10">{isAuthenticated ? 'Log Out' : 'Log In'}</span>
          </button>
        </nav>
      </div>
      <div className="container mx-auto px-4 mt-4">
        <div className="flex flex-wrap items-center lg:pl-20">
          <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
            <div className="lg:max-w-4xl">
              <h1 className="mb-6 text-2xl md:text-3xl xl:text-5xl text-gray-900 font-bold font-heading">
                {title}
              </h1>
              <p className="mb-9 text-gray-600 text-lg">
                Experience a new era of patient management with our cutting-edge system. Streamline your hospital's workflow with real-time access to patient records, reducing wait times and enhancing care quality.
              </p>
           <a href='/appointement'>  <button className="px-10 py-5 uppercase text-white text-xs font-semibold tracking-px bg-cyan-600 rounded-md relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-full bg-cyan-500 transform -translate-x-full group-hover:translate-x-0 transition ease-in-out duration-500"></div>
                <span className="relative z-10">Connect Now</span>
              </button></a> 
            </div>
          </div>
          <div className=" lg:w-1/2">
            <img className="block mx-auto object-cover w-[500px]" src={imageURL} alt="Hero" />
          </div>
        </div>
      </div>
    </section>
  );
};

Hero.propTypes = {
  title: PropTypes.string.isRequired,
  imageURL: PropTypes.string.isRequired,
};

export default Hero;
