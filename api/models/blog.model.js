import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // Assuming you have a User model
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Category' // Assuming you have a Category model
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String, 
        required: true,
        unique: true,
        trim: true
    },
    blogContent: {
        type: String,
        required: true,
        trim: true
    },
    featuredImage: {
        type: String,
        required: true,
        trim: true
    },
    
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

const Blog = mongoose.model('Blog', blogSchema, 'blogs');
export default Blog;