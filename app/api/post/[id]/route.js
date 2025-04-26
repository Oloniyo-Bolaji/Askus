import { connecttoDb } from '@utils/database.js';
import Post from '@models/post.js';
import User from '@models/user.js';

//GET
export const GET = async (req, { params }) => {
  try {
    await connecttoDb();
    const post = await Post.findById(params.id);
    if (!post) {
      return new Response('Post not found', { status: 404 });
    }
    return new Response(JSON.stringify(post), { status: 200 });
  } catch (error) {
    return new Response('error', { status: 500 });
  }
}

//PATCH
export const PATCH = async (req, {params}) => {
  const {creator, comment}  = await req.json();
  try{
    await connecttoDb()
    const post = await Post.findById(params.id);
    if (!post) {
      return new Response('Post not found', { status: 404 });
    }
   post.comments.push({ 
      creator, 
      comment });
    await post.save();
    return new Response(JSON.stringify(post), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response('Error updating post', { status: 500 });
  }
}

//DELETE
export const DELETE = async (req, { params }) => {
  try {
    await connecttoDb();
    const deletedPost = await Post.findByIdAndDelete(params.id);
    if (!deletedPost) {
      return new Response('Post not found', { status: 404 });
    }
    return new Response('Post deleted successfully', { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response('Error deleting post', { status: 500 });
  }
};
