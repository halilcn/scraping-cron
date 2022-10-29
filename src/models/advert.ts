import { Schema, model } from 'mongoose'

const Advert = new Schema(
  {
    advertId: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    status: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    room: {
      type: String,
      required: true,
      trim: true,
    },
    squareMetres: {
      type: Number,
      required: true,
    },
    buildingAge: {
      type: [Number, null],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    district: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    currentFloor: {
      type: Number,
      required: true,
    },
    furnitureStatus: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
  },
  {
    timestamps: true,
  }
)

export default model('Advert', Advert)
