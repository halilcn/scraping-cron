import { model, Schema } from 'mongoose'

const validateEmail = (email: string) => {
  var condition = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  return condition.test(email)
}

const User = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: [validateEmail, 'Please fill a valid email address'],
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

export default model('User', User)
