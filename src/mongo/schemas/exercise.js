import mongoose from 'mongoose'

const { Schema } = mongoose

const ExerciseSchema = new Schema({
  id: {
    type: Schema.ObjectId,
    required: true,
    unique: true,
    auto: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
})

const Exercise = mongoose.model('Exercise', ExerciseSchema)

export default Exercise
