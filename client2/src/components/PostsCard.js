import React, { useContext, useEffect, useState } from 'react';
import UploadCard from "./UploadCard";
import PostCard from './PostCard';
import { MediaContext } from '../context/MediaContext';


const PostsCard = () => {

  const {getAllPosts,user,posts}=useContext(MediaContext)


 useEffect(() => {
    const fetchTimelinePosts = async () => {
      try {
        const timelinePosts = await getAllPosts();
      } catch (error) {
        console.error("Error fetching timeline posts:", error);
      }
    };

    fetchTimelinePosts();
  }, []);



  return (
    <div className='flex flex-col w-full h-full '>
      <UploadCard />
      <div className='w-full h-full bg-custom-gradient overflow-y-scroll custom-scrollbar overflow-x-clip overflow-y-clip scrollbar-none'>
        {posts.map(post => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>

  );
};



export default PostsCard;
