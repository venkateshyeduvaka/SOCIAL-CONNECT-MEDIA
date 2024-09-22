import React, { useContext ,useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { MediaContext } from '../context/MediaContext'
import PostCard from './PostCard';
import profile from "../images/profile.png";
import Cover from "../images/cover.jpg"



const Profileview = () => {
    
    const {id} = useParams()

    const {getUser,userSpecificPosts}=useContext(MediaContext)

    const [Viewuser, setViewUser] = useState({fullname: "", username: "", password: "", gender: "", email: "" ,posts:[],followers:[],following:[],cover_pic:"",profile_pic:""});
  
    const [userposts,setuserposts]=useState([])


    const [followingDetails, setFollowingDetails] = useState([]);

    const [followerDetails, setFollowerDetails] = useState([]);
    

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await getUser(id);
                setViewUser(user.user);
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        };

        if (id) {
            fetchUser();
        }
    }, []);

    useEffect(()=>{
        const userSpecific=async()=>{
            const posts=await userSpecificPosts(id)
            setuserposts(posts?.allposts)
        }
        userSpecific()
       },[id])



       useEffect(() => {
        const fetchFollowingDetails = async () => {
          if (Viewuser?.following?.length > 0) {
            const details = [];
            for (const userId of Viewuser.following) {
              const detail = await getUser(userId);
              if (detail) {
                details.push(detail);
              }
            }
            setFollowingDetails(details);
          }
        };
    
        fetchFollowingDetails();
      }, []);


      useEffect(() => {
        const fetchFollowerDetails = async () => {
          if (Viewuser?.followers?.length > 0) {
            const details = [];
            for (const userId of Viewuser.followers) {
              const detail = await getUser(userId);
              if (detail) {
                details.push(detail);
              }
            }
            setFollowerDetails(details);
          }
        };
    
        fetchFollowerDetails();
      }, []);


      console.log("Viewuser--->",Viewuser)
      console.log("userposts--->",userposts)
      console.log("followingDetails--->",followingDetails)
      console.log("followerDetails--->",followerDetails)

  return (
    <div className='bg-blue-200'>

        <div className='mt-1 bg-white flex flex-col rounded-lg relative gap-1 overflow-x-clip'>
          <div className='relative flex flex-col align-center justify-center w-full'>
           <img src={Cover} className='h-48 w-full rounded-lg' alt="Cover"/>
           <img src={Viewuser?.profile_pic?Viewuser?.profile_pic:profile} className='w-40 h-40 rounded-full absolute -bottom-10 left-[43%] mb-1' alt="Profile"/>
          </div>
        <div className="flex flex-col mt-8 items-center">
          <span className='font-bold'>{Viewuser?.fullname}</span>
        </div>
        <div className='flex flex-col gap-2'>
         <hr className='w-80 self-center border-1 border-solid border-gray-500'/>
         <div className='flex self-center gap-2 w-80 justify-around items-center'>
          <div className='flex flex-col items-center justify-center gap-1'>
            <span className='font-bold'>{Viewuser?.following.length>0?Viewuser.following.length:0}</span>
            <span>Followers</span>
          </div>
          <div className='h-12 border-l-2 border-solid border-gray-500'></div>
          <div className='flex flex-col items-center justify-center gap-1'>
            <span className='font-bold'>{Viewuser?.followers.length>0?Viewuser.followers.length:0}</span>
            <span>Following</span>
          </div>
          <div className='h-12 border-l-2 border-solid border-gray-500'></div>
          <div className='flex flex-col items-center justify-center gap-1'>
            <span className='font-bold'>{Viewuser?.posts.length>0?Viewuser.posts.length:0}</span>
            <span>Posts</span>
          </div>
        </div> 
        <hr className='w-80 border-1 self-center border-solid border-gray-500'/>
       </div>
       <div className='w-[40rem] self-center'>
           <div className='flex w-full h-full bg-blue-200 overflow-x-scroll custom-scrollbar overflow-x-clip overflow-x-clip scrollbar-none'>
            {userposts.map(post => (
             <PostCard key={post._id} post={post} />
            ))}
            </div>
       </div>
       </div>
      
    </div>
  )
}

export default Profileview
