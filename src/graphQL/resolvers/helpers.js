export const editUserByFiledName = async (fieldName, id, model, user) => {
  const fieldValue = user[fieldName]
  const userToEdit = await model.findById(user._id)
  if (!fieldValue) {
    userToEdit[fieldName] = [id]
  } else {
    const exist = fieldValue.some(vId => vId === id)
    if (exist) {
      throw new Error(`${fieldName} have already been added`)
    }
    userToEdit[fieldName] = [...fieldValue, id]
  }
  const editedUser = await userToEdit.save()
  return editedUser
}

export const getUserField = async (fieldName, defaultValue, model, user) => {
  const fieldValue = user[fieldName]
  if (!fieldValue) {
    return defaultValue
  }
  const entities = await Promise.all(fieldValue.map(async (id) => {
    const entity = await model.findById(id)
    return entity
  }))
  return entities
}
