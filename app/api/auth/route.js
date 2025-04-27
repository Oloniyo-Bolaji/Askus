import { connecttoDb } from '@utils/database.js';
import User from '@models/user.js';

export const POST = async (req) => {
  try {
    await connecttoDb();
    const { uid, email, username, number, image } = await req.json();

    let user = await User.findOne({ uid });

    if (!user) {
      user = new User({ uid, email, username, number, image });
      await user.save();
    }

    return new Response(JSON.stringify(user), { status: 201 }); // created new user
  } catch (err) {
    console.error('Error creating user:', err);
    return new Response('Internal Server Error', { status: 500 });
  }
};


