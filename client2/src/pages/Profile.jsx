import React from 'react'
import ProfileLeft from '../components/ProfileLeft'
import ProfileCenter from '../components/ProfileCenter'
import ProfileRight from '../components/ProfileRight'

const Profile = () => {
  return (
    <div className='grid grid-cols-[20rem,auto,20rem]'>
    <ProfileLeft/>
    <ProfileCenter/>
    <ProfileRight/>
  </div>
  )
}



export default Profile

