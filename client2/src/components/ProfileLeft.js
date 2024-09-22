import React from 'react'
import { Link } from 'react-router-dom';


import { IoSearchSharp } from "react-icons/io5";
import InfoCard from './InfoCard';



const ProfileLeft = () => {
  return (
    <div className='h-screen bg-gradient-to-b from-black to-[#dbd4ca] bg-header-gradient'>

      <div className='mb-5 mt-5 ml-5'>
        <Link to="/">
        <span className='text-orange-400 text-3xl font-bold'>Social<span className='text-white'>Connect</span></span>
        </Link>
      </div>  


      <div className='flex items-center m-2'>
        <input className='h-9 w-[16vw]  bg-transparent outline-none border-gray-300 border-2 border-r-0 rounded-l-full px-3 pb-0.5' type='search'/>
        <div className='bg-white h-9 w-12 flex justify-center items-center rounded-r-full'>
          <IoSearchSharp className='h-5 w-5'/>
        </div> 
      </div>


    <InfoCard/>
     
    </div>
  )
}

export default ProfileLeft
