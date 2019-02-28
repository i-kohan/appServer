export default {
  Query: {
    menuItem: async (root, args, { models: { MenuItem } }) => {
      const menuItem = await MenuItem.findOne({ id: args.id })
      return menuItem
    },
    menuItems: async (root, args, { models: { MenuItem } }) => {
      const menuItems = await MenuItem.find({})
      return menuItems
    },
  },
  Mutation: {
    createMenuItem: async (root, { input }, { models: { MenuItem } }) => {
      const newMenuItem = new MenuItem({ ...input })
      const menuItem = await newMenuItem.save()
      return menuItem
    },
    editMenuItem: async (root, { id, input }, { models: { MenuItem } }) => {
      const editedMenuItem = await MenuItem.findOneAndUpdate({ id }, { $set: { ...input } })
      return editedMenuItem
      // pubsub.publish(EXERCISE_EDITED, { exerciseEdited: res })
    },
    deleteMenuItem: async (root, { _id }, { models: { MenuItem } }) => {
      const removedMenuItem = await MenuItem.findOneAndRemove({ _id })
      return removedMenuItem
    },
  },
}
