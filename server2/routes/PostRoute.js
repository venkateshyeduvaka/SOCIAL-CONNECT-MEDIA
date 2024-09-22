const express=require("express")


const {CreatePost,CommentOnPost,LikeOnPost,GetTimelinePosts,getAllPosts}=require("../controllers/PostController")



const router=express.Router()

router.post("/:id/create",CreatePost)



router.put("/:id/like",LikeOnPost)
router.put("/:id/comment",CommentOnPost)

router.get("/user/:id",GetTimelinePosts)

router.get("/allposts",getAllPosts)

module.exports=router


