const {Post}=require("../class/Post")
const UserModel=require("../models/UserModel")


const CreatePost = async (req, res) => {
    try {
        const userId = req.params.id; // Get user ID from request parameters
        const { image, description, likes, comments } = req.body; // Destructure request body

        // Create a new post using the PostService
        console.log("test1")
        const newPost = await Post.createPost(image, description, likes, comments, userId);
console.log("test2--->",newPost)
        // Update the user's document to include the new post in the posts array
        await UserModel.findByIdAndUpdate(
            userId,
            { $push: { posts: newPost._id } }, // Push the new post's ID into the posts array
            { new: true, useFindAndModify: false } // Options to return the updated document and avoid deprecated methods
        );

        // Send a response with the new post details
        res.status(200).json({
            msg: 'Post created successfully',
            post: {
                _id: newPost._id, // Use _id instead of id
                user: newPost.user,
                image: newPost.image,
                description: newPost.description,
                likes: newPost.likes,
                comments: newPost.comments
            }
        });
    } catch (error) {
        console.error("Error in registering data entered by the user:", error.message); // Improved logging message
        res.status(500).json({ error: "Internal Server Error" });
    }
};



const CommentOnPost = async (req, res) => {
    try {
        const postId  = req.params.id;
        const { commentText,userId } = req.body;

        const updatedPost = await Post.commentPost(postId, userId, commentText);

        res.status(200).json({
            msg: 'Comment added successfully',
            post: updatedPost
        });
    } catch (error) {
        console.error("Error adding comment to the post:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


const LikeOnPost = async (req, res) => {
    try {
        const postId  = req.params.id;
        const { userId } = req.body;

        //console.log("likeonpost---->",postId)

        const updatedPost = await Post.likePost(postId, userId);

        res.status(200).json({
            msg: 'Comment added successfully',
            post: updatedPost
        });
    } catch (error) {
        console.error("Error Like a  post:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};




const GetTimelinePosts=async(req,res)=>{
    try {

        const userId  = req.params.id

        const Postsdata = await Post.getUserSpecificPosts(userId);
        ///console.log("GetTimelinePosts",Postsdata)
        res.status(200).json({msg: 'Time LinePosts successfully', allposts:Postsdata})

    } catch (error) {
        console.error("Error TimelinePosts:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }

}

const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.getAllposts();

        // Log the posts before sorting to see their createdAt values
        //console.log("Posts before sorting:", posts);

        const sortedPosts = posts.sort((a, b) => new Date(a.createdAt) + new Date(b.createdAt));

        // Log the posts after sorting to verify the order
       // console.log("Posts after sorting:", sortedPosts);

        res.status(200).json({
            posts: sortedPosts
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports={CreatePost,CommentOnPost,LikeOnPost,GetTimelinePosts,getAllPosts}