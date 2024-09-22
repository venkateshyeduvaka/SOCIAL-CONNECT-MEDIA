import React, { createContext, useState, useEffect, useLayoutEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";


export const MediaContext = createContext();

export const MediaProvider = ({ children }) => {
    const [user, setUser] = useState({ fullname: "", username: "", password: "", gender: "", email: "" ,posts:[],followers:[],following:[],cover_pic:"",profile_pic:""});
    const [loginData, setLoginData] = useState({ username: "", password: "" });
    const [posts, setALLPost] = useState([]);
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();

    const registerUser = async (user) => {
        setError("");

        if (!user.fullname || !user.username || !user.gender || !user.password || !user.email) {
            setError("All fields are required except address");
            return;
        }
        setIsSubmitting(true);
        try {
            const response = await axios.post("http://localhost:4001/user/register", user);
            localStorage.setItem("user", JSON.stringify(response.data));
            toast.success("Registered Successfully", { position: "bottom-right" });
            getCurrentUser();
            onSubmitSuccess(response.data.jwtToken)
            //navigate("/");
        } catch (err) {
            setError("Registration failed");
            console.error("Registration error:", err);
        } finally {
            setIsSubmitting(false);
        }
    };


    const onSubmitSuccess = jwtToken => { 
        Cookies.set("jwt_token", jwtToken, { expires: 30,path: "/",}) 
        navigate("/");
        }



    const loginUser = async (loginData) => {
        setError("");

        if (!loginData.username || !loginData.password) {
            setError("All fields are required");
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await axios.post("http://localhost:4001/user/login", loginData);
            localStorage.setItem("user", JSON.stringify(response.data));
            toast.success("Login Successful", { position: "bottom-right" });
            getCurrentUser();
            //console.log("token--->",response.data.jwtToken)
            //console.log("t2--->",response.data)
            onSubmitSuccess(response.data.jwtToken)
            //navigate("/");
        } catch (err) {
            setError("Invalid credentials");
            console.error("Login error:", err);
        } finally {
            setIsSubmitting(false);
        }
    };

    const getCurrentUser = async () => {
        const data = JSON.parse(localStorage.getItem("user"));
        if (!data || !data.user) {
            return;
        }
        const userId = data.user._id;

        try {
            const response = await axios.get(`http://localhost:4001/user/${userId}`);
            setUser(response.data);
            console.log(response.data);
        } catch (error) {
            setError("Failed to fetch current user");
            console.error("Current user error:", error);
        }
    };

    const getUser = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:4001/user/${userId}`);
            return response.data;
        } catch (error) {
            setError("Failed to fetch user");
            console.error("User fetch error:", error);
        }
    };

    const getAllUsers = async () => {
        try {
            const response = await axios.get("http://localhost:4001/user/");
            return response.data;
        } catch (error) {
            console.error("Error fetching all users:", error);
            throw error;
        }
    };

    const followUser = async (followerId,userId) => {
        try {
            const response = await axios.put(`http://localhost:4001/user/${userId}/follow`, { followerId });
            const updatedUser = response.data.user;

            const temp=[...user?.user?.followers, followerId]

            console.log("followeruser--->context--->",temp)

            setUser((prevUser) => ({
                ...prevUser,
                followers: temp,
            }));
            toast.success("Successfully followed the user", { position: "bottom-right" });
            getCurrentUser()
        } catch (error) {
            toast.error("Failed to follow the user", { position: "bottom-right" });
            console.error("Follow error:", error);
        }
    };


    const unfollowUser = async (followerId,userId) => {
        try {
            const response = await axios.put(`http://localhost:4001/user/${userId}/unfollow`, { followerId });
            const updatedUser = response.data.user;

            const temp=user?.user?.followers.filter((id)=>id!==followerId)
            setUser((prevUser) => ({
                ...prevUser,
                followers: temp,
            }));
            toast.success("Successfully unfollowed the user", { position: "bottom-right" });
            getCurrentUser()
        } catch (error) {
            toast.error("Failed to unfollow the user", { position: "bottom-right" });
            console.error("Unfollow error:", error);
        }
    };

    const userPosting = async (postdata, userId) => {
        setError("");

        if (!postdata.image || !postdata.description) {
            setError("All fields are required");
            return;
        }

        try {
            const response = await axios.post(`http://localhost:4001/post/${userId}/create`, postdata);
            const newPost = response.data.post;
            const newPostId = response.data.post._id;
            setALLPost((prevPosts) => [newPost, ...prevPosts]);
            const temp=[...user?.user?.posts,response.data.post._id]
            setUser((prevUser) => ({
                ...prevUser,
                posts: temp,
            }));

            getCurrentUser();
            getAllPosts()
            toast.success("Post added successfully", { position: "bottom-right" });
        } catch (error) {
            console.error("Error posting:", error);
        }
    };

    const userPostLike = async (postId, userId) => {
        try {
            const response = await axios.put(`http://localhost:4001/post/${postId}/like`, { userId });
            toast.success("Post liked successfully", { position: "bottom-right" });
        } catch (error) {
            console.error("Error liking post:", error);
            toast.error("Error liking post", { position: "bottom-right" });
        }
    };

    const userPostComment = async (postId, commentText, userId) => {
        try {
            const response = await axios.put(`http://localhost:4001/post/${postId}/comment`, {
                userId,
                commentText
            });
            toast.success("Comment added successfully", { position: "bottom-right" });
            getCurrentUser()
            //console.log("user-context",response.data.post.comments[-1])
            return response.data.post.comments
        } catch (error) {
            console.error("Error adding comment:", error);
            toast.error("Error adding comment", { position: "bottom-right" });
        }
    };

    const userSpecificPosts = async (userId) => {
        try {
           const data = JSON.parse(localStorage.getItem("user"));
            const use = data.user._id;

            const response = await axios.get(`http://localhost:4001/post/user/${use}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching user posts:", error);
            throw error;
        }
    };

    const updateUserDetails = async (userDetails, userId) => {
        try {
            const response = await axios.put(`http://localhost:4001/user/update/${userId}`, userDetails);
            setUser(response.data.user);
            getCurrentUser();
            toast.success("User details updated successfully", { position: "bottom-right" });
        } catch (error) {
            console.error("Error updating user details:", error);
            toast.error("Error updating user details", { position: "bottom-right" });
        }
    };

    const getAllPosts = async () => {
        try {
            const response = await axios.get("http://localhost:4001/post/allposts");
            setALLPost(response.data.posts);
            return response.data;
        } catch (error) {
            console.error("Error fetching all posts:", error);
            throw error;
        }
    };


    useLayoutEffect(() => {
        getCurrentUser();
        getAllPosts();
    }, []);

    return (
        <MediaContext.Provider value={{
            user,
            loginData,
            error,
            isSubmitting,
            posts,
            updateUserDetails,
            userSpecificPosts,
            userPostComment,
            userPostLike,
            userPosting,
            getAllPosts,
            followUser,
            unfollowUser,
            getAllUsers,
            getUser,
            registerUser,
            loginUser,
            setUser,
            setLoginData,
        }}>
            {children}
        </MediaContext.Provider>
    );
};
