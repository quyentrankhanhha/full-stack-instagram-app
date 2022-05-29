const expect = require('expect')
const request = require('supertest')
const { ObjectID } = require('mongodb')
const app = require('../routes/auth')
const { testLogin } = require('../constant')
const { User } = require('../model/user')

describe('POST /api/register', () => {
  it('should create user', (done) => {
    request(app)
      .post('/api/register')
      .send({
        email: testLogin.email,
        password: testLogin.password,
      })
      .expect(201)
      .expect((res) => {
        expect(res.body.token).toBe(testLogin.token)
        expect(res.body.message).toBe('User created succesfully')
        expect(res.body.user.username).toBe(testLogin.username)
      })
      .end((err) => {
        if (err) return done(err)

        User.findOne({ email }).then((user) => {
          expect(user).not.toBeNull()
          expect(user.password).not.toBeNull(testLogin.password)
          done()
        })
      })
  })

  it('should return validation errors if request is invaild', (done) => {
    request(app)
      .post('/api/register')
      .send({
        email: 'asdvsdf',
        password: 'sd3',
      })
      .expect(400)
      .end(done)
  })

  it('should not create user if email in use', (done) => {
    request(app)
      .post('/api/register')
      .send({
        email: users[0].email,
        password: '12345670',
      })
      .expect(409)
      .expect((res) =>
        expect(res.body.message).toBe('User with given email already exit')
      )
      .end(done)
  })
})

describe('POST /api/login', () => {
  it('should login user and return auth token and user info', () => {
    request(app)
      .post('/api/login')
      .send({ email: testLogin.email, password: testLogin.password })
      .expect(200)
      .expect((res) => expect(res.body.message).toBe('Logged in successfully!'))
      .end((err, res) => {
        if (err) return done(err)
      })
  })

  it('should reject invalid email', (done) => {
    request(app)
      .post('/api/login')
      .send({ email: testLogin.email + '1', password: testLogin.password })
      .expect(401)
      .expect((res) => expect(res.body.message).toBe('Invalid Email'))
  })

  it('should reject invalid password', (done) => {
    request(app)
      .post('/api/login')
      .send({ email: testLogin.email, password: testLogin.password + '1' })
      .expect(401)
      .expect((res) => expect(res.body.message).toBe('Invalid Password'))
  })
})
