import React, { useState, useContext, useEffect } from 'react';
import { FaRegCommentDots, FaRegShareSquare } from "react-icons/fa";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import CommentCard from './CommentCard';
import { MediaContext } from '../context/MediaContext';

const PostCard = ({ post }) => {
    const { getUser,userPostLike,user,userPostComment } = useContext(MediaContext);

    const [commentbox, setcommtbox] = useState(false);
    const [comments, setComments] = useState([...post?.comments]);
    const [commentText, setCommentText] = useState("");

    const [likes, setLikes] = useState(post?.likes?.length);
    const [isLiked, setIsLiked] = useState(post?.likes.includes(user?.user?._id));

    const [postuser, setPostUser] = useState({ fullname: "" });


    


    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await getUser(post.user);
                setPostUser(user.user);
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        };

        if (post.user) {
            fetchUser();
        }
    }, []);
    ///post.user, getUser

    const handleLike = async () => {
        const newLike=await userPostLike(post?._id,user?.user?._id)
        setIsLiked((prev)=>!prev)
        setLikes(isLiked ? likes - 1 : likes + 1);
    };

    const handleComment = async () => {
        const newComment = await userPostComment(post._id,commentText,user?.user?._id);
        setComments(newComment);
        setCommentText("");
    };

   //console.log("comments posts--->",comments)
   // const {comment}=comments
   // console.log(comment)
   //comments.map((each)=>console.log(each))

 


   
    return (
        <div className="flex flex-col p-2 bg-custom-gradient rounded-lg gap-2 m-3 border-2">
            <img src={post.image} alt="" />
            <hr className='w-full border-1 self-center border-solid border-white-500'/>
            <div className="flex items-start gap-4">
                {isLiked ? 
                    <AiFillLike className='w-8 h-8' onClick={handleLike} /> : 
                    <AiOutlineLike className='w-8 h-8' onClick={handleLike} />
                }
                <FaRegCommentDots className='w-8 h-8' onClick={() => setcommtbox(!commentbox)} />
                <FaRegShareSquare className='w-8 h-8' />
            </div>
            <span>{likes} likes</span>
            <div className="">
                <span><b>{postuser?.fullname || 'Unknown'}</b></span><br/>
                <p> {post.description}</p>
            </div>
            {commentbox && 
                <div className='bg-form-gradient h-20vh w-full rounded-md'>
                    <div className='flex justify-between'>
                        <h3 className='self-center text-lg  ml-2 text-gray-800 font-bold hover:cursor-pointer'>Comments</h3>
                        <RxCross2 onClick={() => setcommtbox(false)} className='h-5 w-5 ml-2 text-lg text-gray-800 font-bold'/>
                    </div>
                    <div className='flex p-2 overflow-y-scroll items-center custom-scrollbar scrollbar-none'>
                        <input 
                            type="text" 
                            value={commentText} 
                            onChange={(e) => setCommentText(e.target.value)} 
                            className='w-4/5 h-8 bg-transparent outline-none border-gray-300 border-2 rounded-md'
                            placeholder="Add a comment..." 
                        />
                        <button className='h-8 m-1  w-12 bg-blue-400 rounded-md ' onClick={handleComment}>Post</button>
                        {comments?.map(comment => (
                            <CommentCard key={comment._id} comment={comment} />
                        ))}
                    </div>
                </div>
            }
        </div>
    );
}

export default PostCard;
