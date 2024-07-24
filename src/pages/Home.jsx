// eslint-disable-next-line no-unused-vars
import React from 'react'

import Hero from "../components/Hero"
import Biography from '../components/Biography'
import Departments from '../components/Departments'
import MessageForm from '../components/MessageForm'

const Home = () => {
  return (
    <div>
      
        <Hero title={"Revolutionize Patient Management with Our Advanced System"} imageURL={"/doctor.png"}/>
        <div className='h-2 w-full bg-gray-900 mt-8'></div>
        <Biography/>
        <div className='h-2 w-full bg-gray-900 mt-8'></div>
        <Departments/>
        <div className='h-2 w-full bg-gray-900 mt-8'></div>
        <MessageForm/>
        <div className='h-2 w-full bg-gray-900 mt-8'></div>
    </div>
  )
}

export default Home