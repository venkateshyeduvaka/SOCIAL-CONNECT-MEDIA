import React, { useContext, useEffect,useState } from 'react'
import DemoCard from './DemoCard'
import FollowCard from './FollowCard'
import { MediaContext } from '../context/MediaContext'


const FollowingCards = () => {
  const {user,getUser}=useContext(MediaContext)
  //console.log("followingCard--->",user?.user?.following)
  const [followingDetails, setFollowingDetails] = useState([]);




  useEffect(() => {
    const fetchFollowingDetails = async () => {
      if (user?.user?.followers?.length > 0) {
        const details = [];
        for (const userId of user.user.followers) {
          const detail = await getUser(userId);
          if (detail) {
            details.push(detail);
          }
        }
        setFollowingDetails(details);
      }
    };

    fetchFollowingDetails();
  }, [user]);
  
  //console.log("followingDetails---->",followingDetails)
  //let res=followingDetails.map((person) => console.log("data-->",person.user))


  return (
      <div className='flex flex-col shadow bg-form-gradient h-[48vh] m-3 rounded-lg'>
        <h1 className='text-White-400 text-xl bg-gray-300 rounded-lg text-center text-blue-900 font-bold'>You Following</h1>
        <div className=' h-[45vh] overflow-y-auto scrollbar-none'>
        {followingDetails.length > 0 
          ? followingDetails.map((person) => <FollowCard person={person.user} key={person.user._id} />)
          : <h1>Start your Connecting</h1>
        }
        </div>
    </div>
    
  )
}

export default FollowingCards
