import asyncHandler from "express-async-handler";
import { getAuth } from "@clerk/express";
import Comment from "../models/comment.model.js";
import User from "../models/user.model.js";
import Post from "../models/post.model.js";
import Notification from "../models/notification.model.js";

export const getComments = asyncHandler( async (req, res)=>{

    const { postId} = req.params

    const comments = await Comment.find({post: postId})
    .sort({createdAt: -1})
    .populate("user","userName, lastName, firstName, profilePicture")

    res.status(200).json({ comments })

})

export const createComment = asyncHandler(async (req, res)=>{
    const { userId } = getAuth.req;
    const { postId } = req.params;
    const { content } = req.body;

    if (!content || content.trim()===""){  
        return res.status(404).json({ error:"comment content is required"});
    }

    const user = await User.findOne({clerkId: userId});
    const post = await Post.findById(postId)

    if (!user || !post ) return res.status(404).json({ error:"user or post not found " })

        const comment = await Comment.create({
            user: user._id,
            post: postId,
            content,
        })

        await post.findByIdAndUpdate(postId,{
            $push: {comments: comment._id}
        });



        if(post.user.toString() !== user._id.toString()){ 
            await Notification.create({
                from:user._id,
                to:post.user,
                type:"comment",
                post:postId,
                comment:comment._id,

            })
        }

        res.status(200).json({ comment })


    })

export const deleteComment = asyncHandler ( async(req, res )=>{
    const comment = await Comment.findById(commentId)
     if(!User || !comment){
        return res.status(403).json({error: "you can only delete tour comments" })

     }

     // remove comments from post 
     await Post.findByIdAndUpdate(comment.post, {
        $pull: {comments: commentId}
     })

     await Comment.findByIdAndDelete(commentId)

     res.status(200).json({ message: "content delete successfully"})
})


