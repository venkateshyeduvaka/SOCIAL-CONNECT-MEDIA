
const express=require("express")

const {registeruser,loginuser,updateUser,followUser,unfollowUser,getUser,getAllUsers} =require("../controllers/UserController")

const router=express.Router()




router.get("/:id",getUser)
router.get("/",getAllUsers)



router.post("/login",loginuser)
router.post("/register",registeruser)

router.put("/update/:id",updateUser)
router.put("/:id/follow",followUser)
router.put("/:id/unfollow",unfollowUser)




module.exports=router