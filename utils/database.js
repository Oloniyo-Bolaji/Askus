import mongoose from 'mongoose';


export const connecttoDb = async () => {
  mongoose.set('strictQuery', true)
  try{
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Connected to Database')
  }catch(error){
    console.log(error)
  }
}