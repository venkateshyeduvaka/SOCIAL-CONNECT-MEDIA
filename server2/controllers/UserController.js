

const {User}=require("../class/User")

const registeruser=async function(req,res){
    try {
        const { fullname,username,password,gender,email,profile_pic,cover_pic,posts,followers,following } = req.body;
        const response = await User.register(fullname,username,password,gender,email,profile_pic,cover_pic,posts,followers,following); 
        res.status(200).json({ 
            msg: 'User registation successfully',
            jwtToken: response.token,
            user:{
                _id:response._id,
                //fullname:response.fullname,
                //username:response.username,
               // password:response.password,
                //gender:response.gender,
               // email:response.email,
               // posts:response.posts,
               // followers:response.followers,
                //following:response.following
            }
        });
    } catch (error) {
        console.log("Error in register data enter by the user:", error.message)
        res.status(500).json({error: "Internal Server Error"})
    }

}


const loginuser = async function(req, res) {
    try {
        const { username, password } = req.body;
        //console.log("check",username,password)
        const response = await User.login(username, password); 

        //console.log("test-->",response)
        const { _id, fullname, posts, followers, following, token } = response;
        res.status(200).json({ 
            msg: 'User logged in successfully',
            jwtToken: token,
            user: {
                _id,
               // username: response.username,
                //fullname,
                //posts,
               // followers,
               // following
            }
        });
    } catch (error) {
       // console.log("venky")
        console.log("Error in login credentials:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


const updateUser = async (req, res) => {
    const userId = req.params.id;
    const { _id, password, fullname, username, gender, email, profile_pic, cover_pic } = req.body;

    // Ensure only the user can update their own profile
    if (userId !== _id) {
        return res.status(403).json("Access Denied! You can update only your own Account.");
    }

    // Construct the data object, excluding undefined fields
    const data = { fullname, username, gender, email, profile_pic, cover_pic };
    if (password) {
        data.password = password;
    }

    try {
        // Call the updateProfile method
        const response = await User.updateProfile(userId, data);

        res.status(200).json({
            msg: 'User updated successfully',
            token: response.token,
            user: {
                _id: response._id,
                fullname: response.fullname,
                username: response.username,
                gender: response.gender,
                email: response.email,
                profile_pic: response.profile_pic,
                cover_pic: response.cover_pic
            }
        });
    } catch (error) {
        console.error("Error in UpdateProfile:", error.message); // Use proper logging
        res.status(500).json({ error: "Internal Server Error" });
    }
};



const followUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const followerId = req.body.followerId;

        const updatedUser = await User.followuser(userId, followerId);
        res.status(200).json({ 
            msg: 'Successfully followed the user',
            user: {
                username: updatedUser.username,
                followers: updatedUser.followers,
                following: updatedUser.following
           }
           
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller to handle unfollowing a user
const unfollowUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const followerId = req.body.followerId;

        const updatedUser = await User.unfollowuser(userId, followerId);
        res.status(200).json({ 
            msg: 'Successfully unfollowed the user',
            user: {
                _id: updatedUser._id,
                username: updatedUser.username,
                followers: updatedUser.followers,
                following: updatedUser.following
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



  

// Controller to handle fetching a single user by ID
const getUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.getUser(userId);

        res.status(200).json({
            user: {
                _id: user._id,
                username: user.username,
                fullname: user.fullname,
                email:user.email,
                posts:user.posts,
                profile_pic: user.profile_pic,
                cover_pic: user.cover_pic,
                followers: user.followers,
                following: user.following
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller to handle fetching all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.getAllUsers();
        res.status(200).json({
            users: users.map(user => ({
                _id: user._id,
                username: user.username,
                fullname: user.fullname,
                followers: user.followers,
                following: user.following,
                profile_pic: user.profile_pic,
                cover_pic: user.cover_pic,
            }))
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



module.exports={registeruser,loginuser,updateUser,followUser,unfollowUser,getUser,getAllUsers}