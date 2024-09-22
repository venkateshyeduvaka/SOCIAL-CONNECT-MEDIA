

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Cookies from "js-cookie"

import { IoSearchSharp, IoHomeOutline,IoChatboxEllipsesOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from 'react-router-dom';
import { MediaContext } from '../context/MediaContext';



const Header1 = () => {

    const {user}=useContext(MediaContext)

    const navigate=useNavigate()

    const HandleLogout=()=>{
        Cookies.remove("jwt_token") 
        localStorage.removeItem("user")
        navigate("/login")
    }
  

    return (
        <div className='flex flex-col w-[20vw] h-[100vh] shadow bg-gradient-to-b from-black to-[#dbd4ca] to-white-200 bg-header-gradient px-3 items-center'>
            
                <div className='mb-5 mt-5'>
                    <Link to="/">
                    <span className='text-orange-400 text-3xl font-bold'>Social<span className='text-white'>Connect</span></span>
                    </Link>
                </div>
            
            <div className='flex items-center m-2'>
                <input
                    className='h-9 w-[14vw] bg-transparent outline-none border-gray-300 border-2 border-r-0 rounded-l-full px-3 pb-0.5'
                    type='search'
                />
                <div className='bg-white h-9 w-12 flex justify-center items-center rounded-r-full'>
                    <IoSearchSharp className='h-5 w-5' />
                </div>
            </div>

            <div className='flex flex-col h-[25vh] w-[15vw] p-5'>
                <div className='flex gap-2 items-center mt-2 mb-7'>
                    <IoHomeOutline className='w-8 h-8 text-orange-400' />
                    <span className='text-white'>Home</span>
                </div>
               
               <Link to="/profile">
                <div className='flex gap-2 items-center mb-7'>
                    <CgProfile className=' h-8 w-8 text-orange-400' />
                    <span className='text-white'>Profile</span>
                </div>
                </Link>

                <div className='flex gap-2 items-center '>
                    <IoChatboxEllipsesOutline className='w-8 h-8 text-orange-400' />
                    <span className='text-white'>Chats</span>
                </div>

            </div>

            <div className='flex-col mt-auto mb-3'>
                <hr className="my-4 border-t-2 border-gray-300 w-[19vw]" />
                <div className='flex flex-col items-center pr-2'>
                    <CgProfile className='text-orange-400 h-8 w-8' />
                    <span className='text-white text-xl font-bold'>{user?.user?.fullname}</span>
                    <button  onClick={HandleLogout}
                    className='bg-orange-400 hover:bg-orange-900 text-white px-3 h-6 rounded-md'
                    >
                    Logout
                </button>
                </div>
                
            </div>
        </div>
    );
};

export default Header1;
