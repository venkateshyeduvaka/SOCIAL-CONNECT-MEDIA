import React,{ useContext, useState }  from 'react'
import Cookies from "js-cookie"

import ProfileModal from './ProfileModal';
import { MediaContext } from '../context/MediaContext';
import { useNavigate } from 'react-router-dom';


import { FaPen } from "react-icons/fa";


const InfoCard = () => {
    const [modalOpened, setModalOpened] = useState(false);
    
    
    const {user}=useContext(MediaContext)
    console.log("INfoCard---->",user)

    const navigate=useNavigate()


    const HandleLogout=()=>{
      Cookies.remove("jwt_token") 
      localStorage.removeItem("user")
      navigate("/login")
    }

  return (
    <div className='flex flex-col gap-3 align-center m-2 mt-5 bg-form-gradient p-3 w-90 rounded-lg shadow'>
    <div className='flex  justify-between align-center hover:cursor-pointer'>
        <h4 className='ml-5'>Profile Info</h4>
        <div>
          <FaPen 
            width="2rem"
            height="1.2rem"
            onClick={() => setModalOpened(true)}
          />
          <ProfileModal
            modalOpened={modalOpened}
            setModalOpened={setModalOpened}
          />
        </div>
     
     
    </div>

    <div className="ml-5">
        <span>
        <b>Full Name :</b>
        </span>
        <span>{user?.user?.fullname}</span>
    </div>

    <div className="ml-5">
        <span>
        <b>UserName :</b>
        </span>
        <span>{user?.user?.username}</span>
   </div>

    <div className="ml-5">
        <span>
        <b>Email :</b>
        </span>
        <span>{user?.user?.email}</span>
    </div>

    <button onClick={HandleLogout} className='ml-auto mt-16  self-center flex items-center bg-orange-500  justify-center text-white border-none  rounded-md hover:cursor-pointer hover:text-orange-500 hover:bg-transparent hover:border-2 hover:border-solid hover:border-orange-500 h-8 w-24 pl-8 pr-8'>Logout</button>
</div>
  )

}

export default InfoCard
