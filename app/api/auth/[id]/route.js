import { connecttoDb } from '@utils/database.js';
import User from '@models/user.js';

export const GET = async (req, { params }) => {
  try {
    await connecttoDb();
    const { id } = params; 
    const user = await User.findOne({ uid: id });
    if (!user) {
      return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
    }
    return new Response(JSON.stringify(user), { status: 200 });
  } catch (err) {
    return new Response('error', { status: 500 });
  }
};
