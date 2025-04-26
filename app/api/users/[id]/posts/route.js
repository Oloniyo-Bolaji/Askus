import { connecttoDb } from '@utils/database.js';
import Post from '@models/post.js';

export const GET = async (req, {params}) => {
  try{
    const {id} = await params
    await connecttoDb()
    const posts = await Post.find({"creator.uid": id})
    return new Response(JSON.stringify(posts), {status: 200})
  }catch(error){
    return new Response('error', {status: 500})
  }
}