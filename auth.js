import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import User from "@models/user"; 
import { connecttoDb } from "@utils/database.js";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      try {
        await connecttoDb();
        const existingUser = await User.findOne({ email: user.email });

        if (!existingUser) {
          // Create new user
          const newUser = new User({
            email: user.email,
            username: user.name?.toLowerCase(),
            image: user.image,
          });
          await newUser.save();
        }
        return true;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false;
      }
    },
  
    async session({ session }) {
    const sessionUser = await User.findOne({ email: session.user.email });
    session.user.id = sessionUser._id.toString()
    return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
