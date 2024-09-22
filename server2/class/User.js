const UserModel=require("../models/UserModel")

const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")


class User{

    constructor(fullname,username,password,gender,email,profile_pic,cover_pic,posts,followers,following){
        this.fullname=fullname
        this.username=username
        this.password=password
        this.gender=gender
        this.email=email 
        this.profile_pic=profile_pic 
        this.cover_pic=cover_pic 
        this.posts=posts 
        this.followers=followers 
        this.following=following
    }


    static async register(fullname,username,password,gender,email,profile_pic,cover_pic,posts,followers,following){
        try {
            const user=await UserModel.findOne({username})
    
            if(user && user.fullname){
                throw new  Error("UserName Already Exists")
            }
            
            const salt= await bcrypt.genSalt(10)
            const hashedPassword=await bcrypt.hash(password,salt)
    
            const newuser=new UserModel({fullname,username,password:hashedPassword,gender,email,profile_pic,cover_pic,posts,followers,following})
          
            
            if(newuser){
                await  newuser.save()
                const jwttoken = jwt.sign({ username: newuser.username, id: newuser._id },"MERN",{ expiresIn: "1h" });
                return{
                    _id:newuser.id,
                    fullname:newuser.fullname,
                    username:newuser.username,
                    gender:newuser.gender,
                    password:newuser.password,
                    email:newuser.email,
                    profile_pic:newuser.profile_pic,
                    cover_pic:newuser.cover_pic, 
                    posts:newuser.posts,
                    followers:newuser.followers,
                    following:newuser.following,
                    token:jwttoken
                }
            }
            else{
                throw new Error("Invalid UserData")
            }
    
        } catch (error) {
            console.log("e")
            throw new Error(`Registration Failed ${error.message}`)
        }
        
     }
    

    
    
     static async login(username,password){
    
        try {
    
            const user=await UserModel.findOne({username})
            //console.log("class--->",user)
    
            if(!user){
                throw new Error("Invalid username or password")
            }
    
            const validity = await bcrypt.compare(password, user.password);
            console.log("class-->Validity-->",validity)
            if(!validity){
                //console.log("Invalid password")
                throw new Error("Invalid password");
            }
    
            
            const jwttoken = jwt.sign({ username: user.username, id: user._id },"MERN",{ expiresIn: "1h" });
           
            return{
                _id: user._id,
                fullname: user.fullname,
                username: user.username,
                gender: user.gender,
                email: user.email,
                profile_pic: user.profile_pic,
                cover_pic: user.cover_pic,
                posts: user.posts,
                followers: user.followers,
                following: user.following,
                token: jwttoken
            }
    
            
        } catch (error) {
            throw new Error("Internal Server Error");
        }
    }
  


    static async updateProfile(userId, newData) {
                try {
                    if (newData.password) {
                        const salt = await bcrypt.genSalt(10);
                        newData.password = await bcrypt.hash(newData.password, salt);
                    }
        
                    // Update user profile
                    const updatedUser = await UserModel.findByIdAndUpdate(userId, newData, { new: true });
                    if (!updatedUser) {
                        throw new Error('User not found');
                    }
        
                    const token = jwt.sign({ username: updatedUser.username, id: updatedUser._id }, "MERN", { expiresIn: "1h" });
        
                    return {
                        _id: updatedUser._id,
                        fullname: updatedUser.fullname,
                        username: updatedUser.username,
                        gender: updatedUser.gender,
                        email: updatedUser.email,
                        profile_pic: updatedUser.profile_pic,
                        cover_pic: updatedUser.cover_pic,
                        token
                    };
                } catch (error) {
                    throw new Error(`Profile update failed: ${error.message}`);
                }
            }
        
        

    

    static async followuser(userId, followerId) {

        //console.log("userId",userId)
        //console.log("FollowerId",followerId)

        try {
        if (userId == followerId) {
        throw new Error("Action Forbidden: You cannot follow yourself.");
        }
        const followUser = await UserModel.findById(userId);
        const followingUser = await UserModel.findById(followerId);

        //console.log("t1",followUser)

        if (!followUser || !followingUser) {
            throw new Error("User not found.");
        }

        if (followUser.followers.includes(followerId)) {
            throw new Error("You are already following this user.");
        } else {
            followUser.followers.push(followerId);
            followingUser.following.push(userId);
            await followUser.save();
            await followingUser.save();
            return followUser
        }
    } catch (error) {
        throw new Error(`Internal Server Error: ${error.message}`);
    }
}


static async unfollowuser(userId, followerId) {
    try {
        if (userId == followerId) {
            throw new Error("Action Forbidden: You cannot unfollow yourself.");
        }

        const followUser = await UserModel.findById(userId);
        const followingUser = await UserModel.findById(followerId);

        
        //console.log(followingUser)

        if (!followUser || !followingUser) {
            throw new Error("User not found.");
        }

        const followerIndex = followUser.followers.indexOf(followerId);
        const followingIndex = followingUser.following.indexOf(userId);

        if (followerIndex === -1 || followingIndex === -1) {
            throw new Error("You are not following this user.");
        } else {
            followUser.followers.splice(followerIndex, 1);
            followingUser.following.splice(followingIndex, 1);
            await followUser.save();
            await followingUser.save();
            return followUser;
        }
    } catch (error) {
        throw new Error(`Internal Server Error: ${error.message}`);
    }
}




    // Method to unfollow a user
    static async unfollowUser(userId, followerId) {
        try {
            if (userId === followerId) {
                this.handleError("Action Forbidden: You cannot unfollow yourself.");
            }

            const [followUser, followingUser] = await Promise.all([
                UserModel.findById(userId),
                UserModel.findById(followerId)
            ]);

            if (!followUser || !followingUser) {
                this.handleError("User not found.");
            }

            const followerIndex = followUser.followers.indexOf(followerId);
            const followingIndex = followingUser.following.indexOf(userId);

            if (followerIndex === -1 || followingIndex === -1) {
                this.handleError("You are not following this user.");
            } else {
                followUser.followers.splice(followerIndex, 1);
                followingUser.following.splice(followingIndex, 1);
                await Promise.all([followUser.save(), followingUser.save()]);
                return followUser;
            }
        } catch (error) {
            this.handleError(error.message);
        }
    }


    // Method to get a user by ID
    static async getUser(userId) {
        try {
            const user = await UserModel.findById(userId);
            if (!user) {
                throw new Error('User not found');
            }
            return user;
        } catch (error) {
            throw new Error(`Fetching failed: ${error.message}`);
        }
    }

    // Method to get all users
    static async getAllUsers() {
        try {
            //console.log("getAllUsers")
            const users = await UserModel.find();
            if (!users || users.length === 0) {
                consloe.log("err")
                throw new Error('Users not found');
            }
            return users;
        } catch (error) {
            throw new Error(`Fetching failed: ${error.message}`);
        }
    }
}


module.exports={User}