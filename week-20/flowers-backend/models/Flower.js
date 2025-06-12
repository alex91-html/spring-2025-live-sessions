import mongoose, { Schema } from "mongoose";

const flowerSchema = new mongoose.Schema({
  id: String,
  name: {
    type: String,
    required: true
  },
  scientificName: String,
  botanicalFamily: String,
  color: String,
  isSpotted: {
    type: Boolean,
    default: true
  },
  scent: String,
  size: {
    type: String,
    enum: ["Small", "Medium", "Large"]
  },
  symbolism: [String],
  lastSpottedTimestamp: {
    type: Date,
    default: Date.now
  }
})

export const Flower = mongoose.model("Flower", flowerSchema)

