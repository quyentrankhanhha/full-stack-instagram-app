const { ObjectID } = require('mongodb')
const jwt = require('jsonwebtoken')

const userId = new ObjectID()
const testerId = new ObjectID()

export const user = {
  _id: userId,
  email: 'user@gmail.com',
  username: 'user',
  password: 'userpassword',
  token: jwt.sign({ _id: userId }, process.env.JWTPRIVATEKEY).toString(),
}

export const tester = {
  _id: testerId,
  email: 'tester@gmail.com',
  username: 'tester',
  password: 'testpassword',
  token: jwt.sign({ _id: testerId }, process.env.JWTPRIVATEKEY).toString(),
}

export const post = {
  _id: ObjectID(),
  caption: 'First test',
  photo: 'test img',
  createdBy: user,
}

export const testLogin = {
  _id: testerId,
  email: 'tester@gmail.com',
  username: 'iamtest',
  password: 'Aa123456@',
  token: jwt.sign({ _id: testerId }, process.env.JWTPRIVATEKEY).toString(),
}
