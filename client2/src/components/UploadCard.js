import React, { useState, useRef, useContext } from 'react';
import profile from "../images/profile.png";
import uploadImageToCloudinary from './uploadImageToCloudinary';
import { HiOutlinePhotograph } from "react-icons/hi";
import { CiVideoOn } from "react-icons/ci";
import { CiLocationArrow1 } from "react-icons/ci";
import { AiTwotoneSchedule } from "react-icons/ai";
import { TiTimes } from "react-icons/ti";

import { MediaContext } from '../context/MediaContext';


const UploadCard = () => {
  const [image, setImage] = useState(null);
  const [postdata, setPostdata] = useState({
    image: '',
    description: ''
  });

  
  const imageRef = useRef();
  const textRef = useRef();
  
  const { userPosting,user } = useContext(MediaContext); // Extracting userPosting function from context

  const handleChange = (e) => {
    setPostdata({ ...postdata, description: textRef.current.value });
  }

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    const cloudinaryImage = await uploadImageToCloudinary(file);
    setPostdata({ ...postdata, image: cloudinaryImage.url, description: textRef.current.value });
    setImage(cloudinaryImage.url); // Set image URL directly
  };


  const handleShare = async () => {
   // console.log("handelshare--->",postdata)
    await userPosting(postdata,user?.user?._id); // Calling userPosting function from context
   setImage(null); // Clear image after posting
    setPostdata({ image: '', description: '' }); // Clear post data after posting
  };

  return (
    <div className='flex  bg-gradient-to-b from-black to-[#dbd4ca]  bg-header-gradient  p-3 rounded-md w-[54vw] w-full sticky'>
      <img src={profile} className='h-8 w-8 rounded-full' alt="" />
      <div className='flex flex-col w-full gap-2'>
        <input type="text" ref={textRef} onChange={handleChange} required placeholder="What's happening" className='bg-slate-100 rounded-md h-8 w-[35vw] ml-2 border-none outline-none' />
        <div className='flex justify-around mt-3'>
          <div className='pr-9 flex items-center justify-center text-sm rounded-lg hover:cursor-pointer text-green-400' onClick={() => imageRef.current.click()}>
            <HiOutlinePhotograph className='h-5 w-5' />
            Photo
          </div>
          <div className='pr-9 flex items-center justify-center text-sm rounded-lg hover:cursor-pointer text-violet-400'>
            <CiVideoOn className='h-5 w-5' />
            Video
          </div>
          <div className='pr-9 flex items-center justify-center text-sm rounded-lg hover:cursor-pointer text-red-400'>
            <CiLocationArrow1 className='h-5 w-5' />
            Location
          </div>
          <div className='pr-9 flex items-center justify-center text-sm rounded-lg hover:cursor-pointer text-orange-500'>
            <AiTwotoneSchedule className='h-5 w-5' />
            Schedule
          </div>
          <button type="button" onClick={handleShare} className='flex items-center bg-orange-500 justify-center text-white border-none rounded-md hover:cursor-pointer hover:text-orange-500 hover:bg-transparent hover:border-2 hover:border-solid hover:border-orange-500 h-8 w-20 pl-8 pr-8'>
            Share
          </button>
          <div className='hidden'>
            <input type='file' name='myImage' ref={imageRef} onChange={handleUploadImage} />
          </div>
        </div>
        {image && (
          <div className="max-h-30 object-cover rounded-md flex flex-col">
            <TiTimes onClick={() => setImage(null)} className="self-end hover:cursor-pointer" />
            <img src={image} alt="" /> {/* Access image URL directly */}
          </div>
        )}
      </div>
    </div>
  );
}

export default UploadCard;
