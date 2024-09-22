import React, { useContext, useEffect,useState } from 'react'
import DemoCard from './DemoCard'
import FollowCard from './FollowCard'
import { MediaContext } from '../context/MediaContext'

const FollwersCards = () => {
  const {user,getUser}=useContext(MediaContext)
  console.log("FOLLOWER--->Card--->",user?.user?.following)
  const [followerDetails, setFollowerDetails] = useState([]);



  useEffect(() => {
    const fetchFollowerDetails = async () => {
      if (user?.user?.following?.length > 0) {
        const details = [];
        for (const userId of user.user.following) {
          const detail = await getUser(userId);
          if (detail) {
            details.push(detail);
          }
        }
        setFollowerDetails(details);
      }
    };

    fetchFollowerDetails();
  }, [user]);


  return (
    <div className='flex flex-col  shadow bg-form-gradient h-[48vh] m-3 rounded-lg'>
        <h1 className='text-White-400 rounded-lg text-xl bg-gray-300 text-center text-blue-900 font-bold'>Your Followers</h1>
        <div className=' h-[45vh] overflow-y-auto scrollbar-none'>
        {followerDetails.length > 0 
          ? followerDetails.map((person) => <FollowCard person={person.user} key={person.user._id} />)
          : <h1>Start your Connecting</h1>
        }
        </div>
    </div>
  )
}

export default FollwersCards
