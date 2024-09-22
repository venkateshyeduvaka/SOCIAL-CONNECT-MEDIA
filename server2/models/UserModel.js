const mongoose = require("mongoose");



const userSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    profile_pic: { type: String },
    cover_pic: { type: String },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Posts' }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }]
},
{
    timestamps: true
});


const UserModel = mongoose.model("Users", userSchema);

module.exports = UserModel;
