import React from 'react'
import Header1 from '../components/Header1'
import Sidebar from '../components/Sidebar'
import PostsCard from '../components/PostsCard'


const Home = () => {
  return (
    <div className='h-[100vh] grid grid-cols-[15.5rem,auto,20rem]'>
      <Header1/>
      <div className='h-screen'>
        <PostsCard/>
      </div>
      <Sidebar/>
    </div>
  )
}




export default Home
