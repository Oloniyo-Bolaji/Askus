//PATCH
export const PATCH = async (req, {params}) => {
  const {post, tag}  = await req.json();
  try{
    await connecttoDb()
    const existingPost = await Post.findById(params.id);
    if (!existingPost) {
      return new Response('Post not found', { status: 404 });
    }
   existingPost.post = post
   existingPost.tag = tag
   existingPost.isEdited = true
    await existingPost.save();
    return new Response(JSON.stringify(post), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response('Error updating post', { status: 500 });
  }
}