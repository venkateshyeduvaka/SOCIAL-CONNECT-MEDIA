const mongoose=require("mongoose")



const postSchema = new mongoose.Schema({
    image: { type: String, required: true },
    description: { type: String },
    likes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Users' }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
    comments: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
        comment: { type: String, required: true },
        created_at: { type: Date, default: Date.now }
    }],
},

{
    timestamps: true,
  }
);


const PostModel=mongoose.model("Posts",postSchema)

module.exports=PostModel