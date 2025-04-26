import { connecttoDb } from '@utils/database.js';
import Post from '@models/post.js';

export const GET = async (req, {params}) => {
  try{
    const {id} = await params
    await connecttoDb()
    const comments = await Post.aggregate([
      { $unwind: "$comments" },
      { $match: { "comments.creator.uid": id } },
      { $project: { _id: 0, comment: "$comments.comment", creator: "$comments.creator" } }
      ])
    return new Response(JSON.stringify(comments), {status: 200})
  }catch(error){
    return new Response('error', {status: 500})
  }
}
