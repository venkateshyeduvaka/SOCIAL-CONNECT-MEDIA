import React, { useContext, useState, useEffect } from 'react';
import profile from "../images/profile.png";



const DemoCard = () => {
    
const [isFollowing,setIsFollowing]=useState(false)

    return (
        <div className='flex w-full items-center border-2 border-gray-300 m-0.5 justify-between'>
            <div className='flex gap-5'>
                <img src={profile} className='ml-1 h-10 w-10 rounded-full' alt="" />
                <div className='flex flex-col justify-start items-center'>
                    <span className='font-bold text-sm'>fullname</span>
                    <span className='text-sm'>username</span>
                </div>
            </div>
            <button
                type='button'
                className={`flex items-center justify-center text-gray-400 ${isFollowing ? 'bg-orange-800' : 'bg-orange-400'} m-2 border-none rounded-md hover:cursor-pointer hover:text-orange-500 hover:bg-transparent hover:border-2 hover:border-solid hover:border-orange-500 h-8 w-20 pl-8 pr-8`}
            >
                {isFollowing ? 'Unfollow' : 'Follow'}
            </button>
        </div>
    );
};

export default DemoCard;
