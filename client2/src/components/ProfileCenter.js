import React, { useContext, useEffect, useState } from 'react'
import ProfileCard from './ProfileCard'
import UploadCard from './UploadCard'
import PostCard from './PostCard'

import { MediaContext } from '../context/MediaContext'




const ProfileCenter = () => {
    const {user,userSpecificPosts}=useContext(MediaContext)

   const [userposts,setuserposts]=useState([])

   //console.log("profile-->",user?.user?._id)

   useEffect(()=>{
    const userSpecific=async()=>{
        const posts=await userSpecificPosts(user?.user?._id)
        setuserposts(posts?.allposts)
    }
    userSpecific()
   },[user])


  // console.log("profile--Page---->",userposts)

  return (
    <div className='flex flex-col gap-1  align-center h-[100vh] bg-custom-gradient  overflow-y-auto scrollbar-none'>
        <ProfileCard/>
        <UploadCard/>
        <div>
        {userposts.map(post => (
          <PostCard key={post._id} post={post} />
        ))}
        </div>
    </div>
  )
}

export default ProfileCenter
