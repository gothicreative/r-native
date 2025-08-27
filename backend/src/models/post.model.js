import mongoose from "mongoose";
import User from "./user.model";

const postSchema = new mongoose.Schema(
    {
        User: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        content: {
            type: String,
            maxLength: 280,
        },
        image: {
            type: String,
            default: '',
        },
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            }
        ],
        comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Comment',
            }
        ],
    },
    {
        timestamps: true,
    }
);
const Post = mongoose.model('Post', postSchema);
export default Post;