import React, { useContext, useEffect, useState } from 'react';
import FollowCard from './FollowCard';
import ProfileCard from './ProfileCard';
import { MediaContext } from '../context/MediaContext';

const Sidebar = () => {

    const {user,getAllUsers}=useContext(MediaContext)

    const [allusers,setAllUsers]=useState([])

    
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const users = await getAllUsers();
                const filtered = users.users.filter((each) => each._id !== user?.user?._id);
                //console.log("filtered----->", filtered);
                setAllUsers(filtered);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        
        fetchUsers();
    }, [getAllUsers, user._id]);



    

    return (
        <div className='flex flex-col w-full h-[100vh] shadow bg-gradient-to-b from-black to-[#dbd4ca] px-3 bg-header-gradient items-center'>
            <ProfileCard />
            <div className='flex flex-col bg-form-gradient w-full mt-3 rounded-md overflow-y-scroll custom-scrollbar overflow-x-clip overflow-y-clip scrollbar-none'>
                <h3 className='text-center'>PEOPLE YOU MAY KNOW</h3>
                <div className='overflow-y-scroll custom-scrollbar overflow-x-clip overflow-y-clip scrollbar-none'>
                  {allusers.map((person)=><FollowCard person={person} key={person._id}/>)}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;

 