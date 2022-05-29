const { ObjectID } = require('mongodb')
const jwt = require('jsonwebtoken')

const userId = new ObjectID()
export const user = {
  _id: userId,
  email: 'test@gmail.com',
  username: 'tester',
  password: 'testpassword',
  token: jwt.sign({ _id: userId }, process.env.JWTPRIVATEKEY).toString(),
}

export const posts = {
  _id: ObjectID(),
  caption: 'First test',
  photo: 'test img',
  createdBy: user,
}
