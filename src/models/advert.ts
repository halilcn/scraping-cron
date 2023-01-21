import { Schema, model } from 'mongoose'

export const FURNITURE_STATUS = ['eşyalı değil', 'eşyalı']

const Advert = new Schema(
  {
    advertId: {
      type: String,
      default: null,
      trim: true,
      unique: true,
    },
    status: {
      type: String,
      default: null,
      trim: true,
      lowercase: true,
    },
    room: {
      type: String,
      default: null,
      trim: true,
      lowercase: true,
    },
    squareMetres: {
      type: Number,
      default: null,
    },
    buildingAge: {
      type: Number,
      default: null,
    },
    price: {
      type: Number,
      default: null,
    },
    city: {
      type: String,
      default: null,
      trim: true,
      lowercase: true,
    },
    district: {
      type: String,
      default: null,
      trim: true,
      lowercase: true,
    },
    currentFloor: {
      type: Number,
      default: null,
    },
    furnitureStatus: {
      type: String,
      default: null,
      trim: true,
      lowercase: true,
      enum: FURNITURE_STATUS,
    },
    company: {
      type: String,
      default: null,
      trim: true,
      lowercase: true,
    },
    link: {
      type: String,
      default: null,
      trim: true,
      lowercase: true,
    },
  },
  {
    timestamps: true,
  }
)

export default model('Advert', Advert)
