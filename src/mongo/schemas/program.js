import mongoose from 'mongoose'

const { Schema } = mongoose

const ProgramSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  exercisesIds: {
    type: Array,
    required: true,
  },
  isCustom: {
    type: Boolean,
  },
}, { timestamps: true })

const Program = mongoose.model('Program', ProgramSchema)

export default Program
