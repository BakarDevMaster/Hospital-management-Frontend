/* eslint-disable no-unused-vars */
import React from 'react'
import Hero from '../components/Hero'
import { useNavigate } from 'react-router-dom';
import { useEffect } from'react';

const About = () => {
  const navigate = useNavigate()
  useEffect(() => {
    const token = localStorage.getItem('patienttoken');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);
  return (
    <div>
       <Hero title={"We know tech, we know finance. We are fintech experts."} imageURL={"/about.jpg"}/>
       <div className='h-2 w-full bg-gray-900 mt-8'></div>
       <>
  {/* component */}
  <div className="py-16 bg-white">
    <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
      <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
        <div className="md:5/12 lg:w-5/12">
          <img
            src="https://tailus.io/sources/blocks/left-image/preview/images/startup.png"
            alt="image"
            loading="lazy"
            width=""
            height=""
          />
        </div>
        <div className="md:7/12 lg:w-6/12">
          <h2 className="text-2xl text-gray-900 font-bold md:text-4xl">
            Nuxt development is carried out by passionate developers
          </h2>
          <p className="mt-6 text-gray-600">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum omnis
            voluptatem accusantium nemo perspiciatis delectus atque autem!
            Voluptatum tenetur beatae unde aperiam, repellat expedita
            consequatur! Officiis id consequatur atque doloremque!
          </p>
          <p className="mt-4 text-gray-600">
            {" "}
            Nobis minus voluptatibus pariatur dignissimos libero quaerat iure
            expedita at? Asperiores nemo possimus nesciunt dicta veniam
            aspernatur quam mollitia.
          </p>
        </div>
      </div>
    </div>
  </div>
</>

    </div>
  )
}

export default About