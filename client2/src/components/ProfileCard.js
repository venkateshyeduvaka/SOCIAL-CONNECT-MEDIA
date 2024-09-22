import React, { useContext, useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';

import Cover from "../images/cover.jpg";
import profile from "../images/profile.png";
import { MediaContext } from '../context/MediaContext';

const ProfileCard = () => {

  const navigate = useNavigate();
  
  const {user}=useContext(MediaContext)
 // console.log("user-->card-->",user?.user?.profile_pic)

  return (
    <div className='mt-1 bg-custom-gradient ml-2 flex flex-col rounded-lg relative gap-1 overflow-x-clip'>
      <div className='relative flex flex-col align-center justify-center w-full'>
        <img src={Cover} className='w-full rounded-lg' alt="Cover"/>
        <img src={user?.user?.profile_pic?user?.user?.profile_pic:profile} className='w-24 h-24 rounded-full absolute -bottom-10 left-[35%]' alt="Profile"/>
      </div>
      <div className="flex flex-col mt-8 items-center">
        <span className='font-bold text-white text-center'>{user?.user?.fullname}</span>
      </div>
      <div className='flex flex-col gap-2'>
        <hr className='w-80 self-center border-1 border-solid border-white-500'/>
        <div className='flex self-center gap-2 w-80 justify-around items-center'>
          <div className='flex flex-col items-center justify-center gap-1'>
            <span className='font-bold'>{user?.user?.following.length>0?user.user.following.length:0}</span>
            <span>Followers</span>
          </div>
          <div className='h-12 border-l-2 border-solid border-white-500'></div>
          <div className='flex flex-col items-center justify-center gap-1'>
            <span className='font-bold'>{user?.user?.followers.length>0?user.user.followers.length:0}</span>
            <span>Following</span>
          </div>
        </div> 
        <hr className='w-80 border-1 self-center border-solid border-white-500'/>
        <h5 onClick={()=>navigate("/profile")} className='self-center text-white underline pb-1 text-base font-bold'>My Profile</h5>
      </div>
    </div>
  );
}


export default ProfileCard;
