import React, { useContext, useState, useEffect } from 'react';
import profile from "../images/profile.png";
import { MediaContext } from '../context/MediaContext';
import { NavLink } from 'react-router-dom';

const FollowCard = ({ person }) => {
    const { user, followUser, unfollowUser } = useContext(MediaContext);

    const [isFollowing, setIsFollowing] = useState(user?.user?.followers.includes(person?._id));
    const [isFollowedByPerson, setIsFollowedByPerson] = useState(person?.followers.includes(user?.user?._id));

    // Handle follow
    const handleFollow = async () => {
        try {
            await followUser(person._id, user?.user?._id);
            setIsFollowing(true);
        } catch (error) {
            console.error('Failed to follow user:', error);
        }
    };

    // Handle unfollow
    const handleUnfollow = async () => {
        try {
            await unfollowUser(person._id, user?.user?._id);
            setIsFollowing(false);
        } catch (error) {
            console.error('Failed to unfollow user:', error);
        }
    };

    // Determine button text
    const getButtonText = () => {
        if (isFollowing) {
            return 'Unfollow';
        } else if (!isFollowing && isFollowedByPerson) {
            return 'Followback';
        } else {
            return 'Follow';
        }
    };

    return (
        <div className='flex w-[97%] bg-white items-center border-2 border-gray-300 m-1 rounded-md justify-between'>
            <div className='flex gap-5'>
                <img src={person?.profile_pic ? person?.profile_pic : profile} className='ml-1 h-10 w-10 rounded-full' alt="" />
                <div className='flex flex-col justify-start items-center'>
                    <span className='font-bold text-sm'>{person?.fullname}</span>
                    <span className='text-sm'>{person?.username}</span>
                </div>
            </div>
            <button
                type='button'
                onClick={isFollowing ? handleUnfollow : handleFollow}
                className={`flex items-center justify-center text-orange-400 ${isFollowing ? 'bg-green-600' : 'bg-green-300'} m-2 border-none rounded-md hover:cursor-pointer hover:text-orange-500 hover:bg-transparent hover:border-2 hover:border-solid hover:border-green-500 h-8 w-20 pl-8 pr-8`}
            >
                {getButtonText()}
            </button>
        </div>
    );
};

export default FollowCard;
