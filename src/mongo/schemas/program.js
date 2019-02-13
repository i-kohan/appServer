import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ProgramSchema = new Schema({
  id: {
    type: Schema.ObjectId,
    required: true,
    unique: true,
    auto: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  exercisesIds: {
    type: Array,
    required: true
  },
  isCustom: {
    type: Boolean
  }
});

const Program = mongoose.model("Program", ProgramSchema);

export default Program;
