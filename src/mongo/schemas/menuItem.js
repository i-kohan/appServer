import mongoose from 'mongoose'

const { Schema } = mongoose

const MenuItemSchema = new Schema({
  path: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  iconName: {
    type: String,
    required: true,
  },
  isPublic: {
    type: Boolean,
    required: true,
    default: 'true',
  },
})

const MenuItem = mongoose.model('MenuItem', MenuItemSchema)

export default MenuItem
