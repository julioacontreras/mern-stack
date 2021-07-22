const connection = require('../tests/connection');
const Post = require('../models/post');

describe('Test getPost method', () => {
  beforeAll((done) => {
    connection.openConnect(done)
  });

  afterAll((done) => {
    connection.closeConnection(done)
  });

  test('GET /api/posts (good path)', async () => {
    try {
      const post = await Post.create({
        name: 'John',
        userId: '1',
        title: 'post 1',
        content: 'hellow world',
        slug: 'post',
        cuid: 'A01'
      });
      expect(1).toEqual(1);
    } catch (error) {
      console.error(error)
      expect(0).toEqual(1);
    }
  });

  test('GET /api/posts (error when dont have cuid)', async () => {
    try {
      const post = await Post.create({
        name: 'John',
        title: 'post 1',
        content: 'hellow world',
        slug: 'post'
      });
      expect(0).toEqual(1);
    } catch (error) {
      expect(1).toEqual(1);
    }
  });
});
