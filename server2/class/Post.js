const PostModel=require("../models/PostModel")

const mongoose =require("mongoose")


const UserModel=require("../models/UserModel")




class Post{

    constructor(image,description,likes,comments){
        this.image=image
        this.description=description
        this.likes=likes 
        this.comments=comments
    }
    

    static async createPost(image,description,likes,comments,userId){

        try {
            const user = await UserModel.findById(userId);
            console.log("post--->",user)
            if (!user) {
                throw new Error("User not found.");
            }
            const newPost = new PostModel({ image, description, likes, comments, user });
            await newPost.save();
            return newPost;
        } catch (error) {
            throw new Error(`Post creation failed: ${error.message}`);
        }
    }

    static async updatePost(postId, newData) {
        try {
            const updatedPost = await PostModel.findByIdAndUpdate(postId, newData, { new: true });
            if (!updatedPost) {
                throw new Error('Post not found');
            }
            return updatedPost;
        } catch (error) {
            throw new Error(`Post update failed: ${error.message}`);
        }
    }

    static async deletePost(postId) {
        try {
            const deletePost = await PostModel.findByIdAndDelete(postId);
            if (!deletePost) {
                throw new Error('Post not found');
            }
            return deletePost;
        } catch (error) {
            throw new Error(`Post deletion failed: ${error.message}`);
        }
    }

  

    static async commentPost(postId, userId, commentText){
        try {
            const post = await PostModel.findById(postId);
            const user = await UserModel.findById(userId);
    
            if (!post) {
                throw new Error("Post not found.");
            }
    
            if (!user) {
                throw new Error("User not found.");
            }
    
            const comment = {
                user: userId,
                comment: commentText,
                created_at: new Date()
            };
    
            post.comments.push(comment);
            await post.save();
    
            return post;
        } catch (error) {
            throw new Error(`Internal Server Error: ${error.message}`);
        }
    };

    static async likePost(postId,userId){
        
        try {
            const post = await PostModel.findById(postId);
            const user = await UserModel.findById(userId);
    
            if (!post) {
                throw new Error("Post not found.");
            }
    
            if (!user) {
                throw new Error("User not found.");
            }
    
            if (post.likes.includes(userId)) {
                post.likes = post.likes.filter((each) => String(each) !== String(userId));
            } else {
                post.likes.push(userId);
            }
    
            await post.save();

    
            return post;
        } catch (error) {
            throw new Error(`Internal Server Error: ${error.message}`);
        }
    }


   /*static async getTimelinePosts (userId){
    
        try {
            // Fetch posts created by the current user
            const currentUserPosts = await PostModel.find({ userId: userId });
            //console.log("t2")
    
            // Fetch posts created by the users whom the current user is following
            const followingPosts = await UserModel.aggregate([
                {
                    $match: {
                        _id: new mongoose.Types.ObjectId(userId)
                    }
                },
                {
                    $lookup: {
                        from: "posts",
                        localField: "following",
                        foreignField: "userId",
                        as: "followingPosts"
                    }
                },
                {
                    $project: {
                        followingPosts: 1,
                        _id: 0
                    }
                }
            ]);
    
            console.log(currentUserPosts)
            // Combine currentUserPosts and followingPosts into one array
            const allPosts = currentUserPosts.concat(...followingPosts[0].followingPosts);
    
            //console.log(allPosts)

            // Sort the combined posts by creation date in descending order
            allPosts.sort((a, b) => b.createdAt - a.createdAt);
    
            // Send the sorted posts as a response

            return allPosts
           // res.status(200).json(allPosts);
    
        } catch (error) {
            // Send an error response in case of any issues
            throw new Error(`Internal Server Error: ${error.message}`);
        }
    };
*/
    static async getUserSpecificPosts(userId){
        try {

            // Fetch posts created by the current user
            const userPosts = await PostModel.find({ user: userId }).sort({ createdAt: -1 });
             //console.log("userPosts",userPosts.)
            return userPosts;
        } catch (error) {
            throw new Error(`Internal Server Error: ${error.message}`);
        }
    };
    
    

    static async getFollowingAndFollowersPosts(userId) {
        try {
            // Fetch posts from users whom the current user is following
            const user = await UserModel.findById(userId).populate('following');
            const followingUsers = user.following.map(follow => follow._id);

            const followingPosts = await PostModel.find({ userId: { $in: followingUsers } });

            // Fetch posts from users who are following the current user
            const followersPosts = await UserModel.find({ following: userId }).populate('posts');

            const allPosts = followingPosts.concat(followersPosts.reduce((acc, follower) => acc.concat(follower.posts), []));

            return allPosts;
        } catch (error) {
            throw new Error(`Error fetching following and followers posts: ${error.message}`);
        }
    }


    static async getAllposts(){
        try {
            const posts = await PostModel.find().sort({ createdAt: -1 });
           // console.log(posts)
            if (!posts ||posts.length === 0) {
                throw new Error('Posts not found');
            }
            return posts
        } catch (error) {
            throw new Error(`Error fetching allposts from database: ${error.message}`);
        }
    }

}

module.exports={Post}