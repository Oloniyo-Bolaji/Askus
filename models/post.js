import {Schema, model, models} from 'mongoose'

const CommentSchema = new Schema({
  creator:{
    type: {
      uid: String,
      username: String,
      email: String,
      number: String,
      image:String
    },
    required:true
  },
  comment:{
    type: String,
    required: [true, 'A post should be made']
  },
},
{
  timestamps: true
}
)

const PostSchema = new Schema({
  creator:{
    type: {
      uid: String,
      username: String,
      email: String,
      number: String,
      image:String
    },
    required:true
  },
  post:{
    type: String,
    required: [true, 'A post should be made']
  },
  tag:{
    type: String,
    required: false
  },
  comments: {
    type : [CommentSchema],
    default: []
  },
  isEdited: {
    type: Boolean,
  }
},
{
  timestamps: true
}
)


 const Post = models.Post || model('Post', PostSchema)
 export default Post;