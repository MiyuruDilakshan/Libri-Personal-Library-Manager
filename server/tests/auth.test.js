const request = require('supertest');
const app = require('../server');

describe('Auth Endpoints', () => {
    
  describe('POST /api/auth/register', () => {
    it('should return 400 if fields are missing', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({ name: 'Test User' }); // Missing email and password
      
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message', 'Please add all fields');
    });

    it('should return 400 if plain password is not provided', async () => {
         const res = await request(app)
        .post('/api/auth/register')
        .send({ name: 'Test', email: 'test@example.com' });
      
      expect(res.statusCode).toEqual(400);
    });
  });

  describe('POST /api/auth/login', () => {
    it('should return 400 if email is missing', async () => {
       const res = await request(app)
        .post('/api/auth/login')
        .send({ password: 'password123' });
      
      expect(res.statusCode).toEqual(400); 
    });
  });
});
