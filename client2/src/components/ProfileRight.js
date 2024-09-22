import React from 'react'
import FollowingCards from './FollowingCards'
import FollwersCards from './FollwersCards'

const ProfileRight = () => {
  return (
    <div className='h-screen bg-header-gradient'>
      <FollowingCards/>
      <FollwersCards/>
    </div>
  )
}




export default ProfileRight
