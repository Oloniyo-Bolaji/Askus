import {Schema, model, models} from 'mongoose'

const UserSchema = new Schema({
  uid:{
    type: String,
  },
  email:{
    type: String,
    required: [true, 'Email is required'],
    unique: true
  },
  username:{
    type: String,
    required: true
  },
  number:{
    type: String
  },
  image:{
    type: String,
    required: true
  },
})


 const User = models.User || model('User', UserSchema)
 export default User;