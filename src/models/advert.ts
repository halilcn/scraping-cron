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
    },
    district: {
      type: String,
      required: true,
      trim: true,
    },
    currentFloor: {
      type: Number,
      required: true,
    },
    furnitureStatus: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
)

export default model('Advert', Advert)
