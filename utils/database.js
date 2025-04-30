import mongoose from 'mongoose';


export const connecttoDb = async () => {
  mongoose.set('strictQuery', true)
  try{
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_CONNECT_STRING)
    
  }catch(error){
    console.log(error)
  }
}