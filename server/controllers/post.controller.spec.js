const supertest = require('supertest');
const app = require('../index');
const connection = require('../tests/connection');
const Post = require('../models/post');

describe('Test getPost method', () => {

  beforeAll((done) => {
    connection.openConnect(done)
  });

  afterAll((done) => {
    connection.closeConnection(done)
  });

  test('GET /api/posts', async () => {
    const post = await Post.create({
      name: 'John',
      title: 'post 1',
      content: 'hellow world',
      slug: 'post',
      cuid: 'A01'
    });
    await supertest(app).get('/api/posts')
      .expect(200)
      .then((response) => {
        // Check type and length
        expect(Array.isArray(response.body.posts)).toBeTruthy();
        expect(response.body.posts.length).toEqual(1);
        // Check data
        expect(response.body.posts[0]._id).toBe(post.id);
        expect(response.body.posts[0].title).toBe(post.title);
        expect(response.body.posts[0].content).toBe(post.content);
      });
  });

});
