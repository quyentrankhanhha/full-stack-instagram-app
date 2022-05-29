const expect = require('expect')
const request = require('supertest')
const { user, post, tester } = require('../constant')
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
      .send({ caption: 'test' })
      .expect(422)
      .expect((res) =>
        expect(res.body.message).toBe('Please upload your image')
      )
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

  it('should not create post without caption', (done) => {
    request(app)
      .post('/api/pic')
      .set('authorization', `Bearer ` + user.token)
      .send({ imageBase64: 'test' })
      .expect(422)
      .expect((res) =>
        expect(res.body.message).toBe('Please upload your caption')
      )
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

describe('DELETE /api/pic/:postId', () => {
  it('should remove a post', (done) => {
    request(app)
      .delete(`/api/pic/${post._id}`)
      .set('authorization', `Bearer ` + user.token)
      .expect(204)
      .expect((res) => {
        expect(res.body.message).toBe('Deleted!')
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

  it('should not remove a post if it is from different user', (done) => {
    request(app)
      .delete(`/api/pic/${post._id}`)
      .set('authorization', `Bearer ` + tester.token)
      .expect(422)
      .end((err, res) => {
        if (err) return done(err)

        Post.findById(post._id)
          .then((item) => {
            expect(item).not.toBeNull()
            done()
          })
          .catch((err) => done(err))
      })
  })

  it('Should return 422 if post id is invalid', (done) => {
    request(app)
      .delete('/api/pic/123abc')
      .set('authorization', `Bearer ` + tester.token)
      .expect(422)
      .end(done)
  })
})

describe('PUT /api/pic/:postId', () => {
  it('should update the caption of the post', (done) => {
    request(app)
      .put(`/api/pic/${post._id}`)
      .set('authorization', `Bearer ` + user.token)
      .send({ caption: 'new caption' })
      .expect(200)
      .expect((res) => {
        expect(res.body.message).toBe('Edited!')
      })
      .end(done)
  })

  it('should not update the post if edited by other user', (done) => {
    request(app)
      .put(`/api/pic/${post._id}`)
      .set('authorization', `Bearer ` + tester.token)
      .send({ caption: 'new caption' })
      .expect(422)
      .end(done)
  })
})

describe('PUT /api/pic/comment', () => {
  it('should create new comment in a post', (done) => {
    request(app)
      .put(`/api/pic/comment`)
      .set('authorization', `Bearer ` + user.token)
      .send({
        postId: post._id,
        text: 'update',
      })
      .expect(200)
      .expect((res) => expect(res.body.message).toBe('Commented!'))
      .end(done)
  })
})
