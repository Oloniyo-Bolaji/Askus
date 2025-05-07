import mongoose, {Schema, model, models} from 'mongoose'

const CreatorSchema = new Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
  },
  username: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  }
}, {
  _id: false  
});


const CommentSchema = new Schema({
  creator:{
    type: CreatorSchema,
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
    type: CreatorSchema,
    required:true
  },
  title:{
    type: String,
    required: false
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
    default: false
  }
},
{
  timestamps: true
}
)


 const Post = mongoose.models.Post || mongoose.model('Post', PostSchema)
 export default Post;