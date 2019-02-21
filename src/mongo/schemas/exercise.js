import mongoose from 'mongoose'

const { Schema } = mongoose

const ExerciseSchema = new Schema({
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
