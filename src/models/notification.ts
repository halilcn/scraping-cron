import { Schema, model } from 'mongoose'
import { NOTIFICATION } from '../constants'

const Notification = new Schema(
  {
    userId: {
      type: String,
    },
    type: {
      type: String,
      enum: Object.values(NOTIFICATION),
    },
    params: {
      type: Object,
    },
    logs: {
      type: Object,
    },
  },
  {
    timestamps: true,
  }
)

export default model('Notification', Notification)
