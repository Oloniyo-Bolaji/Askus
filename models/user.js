import mongoose, {Schema, model, models} from 'mongoose'

const UserSchema = new Schema({
  email:{
    type: String,
    required: [true, 'Email is required'],
    unique: true
  },
  username:{
    type: String,
    required: true
  },
  image:{
    type: String,
    required: true
  },
})


 const User = mongoose.models.User || mongoose.model('User', UserSchema)
 export default User;