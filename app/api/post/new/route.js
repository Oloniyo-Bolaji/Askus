import { connecttoDb } from '@utils/database.js';
import Post from '@models/post.js';

export const POST = async (req) => {
  try {
    const { creator, title, post, tag } = await req.json();

    if (!creator || !post) {
      return new Response('Missing required fields', { status: 400 });
    }

    await connecttoDb();

    const newPost = new Post({ creator,title, post, tag });

    await newPost.save();

    return new Response(JSON.stringify(newPost), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error creating post:', error);
    return new Response(`Failed to create post: ${error.message}`, { status: 500 });
  }
};

