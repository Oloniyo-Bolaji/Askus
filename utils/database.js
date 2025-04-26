import mongoose from 'mongoose';


export const connecttoDb = async () => {
  mongoose.set('strictQuery', true)
  try{
    await mongoose.connect("mongodb+srv://bolajimargaret91:AqWHBAxn49FkWWMT@backend.m58vnpe.mongodb.net/?retryWrites=true&w=majority&appName=Backend")
    
  }catch(error){
    console.log(error)
  }
}