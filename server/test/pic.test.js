const expect = require('expect')
const request = require('supertest')
const { user, post } = require('../constant')
const app = require('../routes/pic')
const { Post } = require('../model/pic')

describe('GET /api/pic', function () {
  it('response json', (done) => {
    request(app)
      .get('/api/pic')
      .expect(200)
      .expect((res) => {
        expect(res.body.posts.length).toBe(1)
      })
      .end(done)
  })
})

describe('POST /api/pic', () => {
  it('should create a new post', (done) => {
    request(app)
      .post('/api/pic')
      .set('authorization', `Bearer ` + user.token)
      .send(post)
      .expect(200)
      .expect((res) => {
        expect(res.body.data.post).toBe(post)
      })
      .end((err, res) => {
        if (err) return done(err)

        Post.find(post)
          .then((items) => {
            expect(items.length).toBe(1)
            expect(items[0]).toBe(post)
          })
          .catch((err) => {
            done(err)
          })
      })
  })

  it('should not create post without image', (done) => {
    request(app)
      .post('/api/pic')
      .set('authorization', `Bearer ` + user.token)
      .send()
      .expect(422)
      .end((err, res) => {
        if (err) return done(err)

        Post.find()
          .then((items) => {
            expect(items.length).toBe(1)
            done()
          })
          .catch((err) => done(err))
      })
  })
})

describe('DELETE /api/pic', () => {
  it('should remove a post', (done) => {
    request(app)
      .delete(`/api/pic/${post._id}`)
      .set('authorization', `Bearer ` + user.token)
      .expect(200)
      .expect((res) => {
        expect(res.body.data.post._id).toBe(post._id)
      })
  }).end((err, res) => {
    if (err) return done(err)

    Post.findById(post._id)
      .then((item) => {
        expect(item).toBeNull()
        done()
      })
      .catch((err) => done(err))
  })
})
