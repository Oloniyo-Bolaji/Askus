import { connecttoDb } from '@utils/database.js';
import Post from '@models/post.js';



//PATCH
export const PATCH = async (req, {params}) => {
  const {title, post, tag, isEdited}  = await req.json();
  try{
    await connecttoDb()
    const existingPost = await Post.findById(params.id);
    if (!existingPost) {
      return new Response('Post not found', { status: 404 });
    }
    existingPost.title = title
   existingPost.post = post
   existingPost.tag = tag
   existingPost.isEdited = true
    await existingPost.save();
    return new Response(JSON.stringify(existingPost), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response('Error updating post', { status: 500 });
  }
}