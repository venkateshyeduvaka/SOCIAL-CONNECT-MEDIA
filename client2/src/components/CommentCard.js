import React, { useContext ,useState,useEffect} from 'react'
import { MediaContext } from '../context/MediaContext';
import profile from "../images/profile.png"

const CommentCard = ({comment}) => {
  
  //console.log("comment prop--->",comment)

  const {getUser}=useContext(MediaContext)
  
  const [CommentUser,setCommentUser]=useState({ fullname: "" })


  useEffect(() => {
    const fetchCommentUser = async () => {
        try {
            const user = await getUser(comment?.user);
            setCommentUser(user.user);
        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    };

    if (comment?.user) {
        fetchCommentUser();
    }
}, []);


 // console.log("comment card--->",comment?.post?.comments)

  return (
    <div className='flex gap-2 items-center'>
       <img src={profile} className='h-8 w-8 rounded-full'/>
       <div className='flex flex-col p-2'>
        <span className='text-gray-400'>{CommentUser?.fullname || 'Unknown'}</span>
        <span className='text-blue-900'>{comment?.comment}</span>
       </div>
    </div>
  )
}

export default CommentCard
