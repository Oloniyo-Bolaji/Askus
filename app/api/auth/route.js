import { connecttoDb } from '@utils/database.js';
import User from '@models/user.js';


export const POST = async (req, res) => {
  if (req.method !== "POST") return res.status(405).end();
  
  try {
    await connecttoDb()
    const {uid, email, username, number, image} = await req.json()
    const user = await User.findOne({uid})
    if(!user){
      const newUser = new User({uid, email,   
      username, number, image})
      await newUser.save()
    }
    return new Response(JSON.stringify(newUser), {status: 200})
  } catch (err) {
    return new Response('error', {status: 500})
  }
};





