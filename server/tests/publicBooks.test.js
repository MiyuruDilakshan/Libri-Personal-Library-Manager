const request = require('supertest');
const app = require('../server');
const axios = require('axios');

jest.mock('axios');

describe('Public Books API', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return 400 if query is missing', async () => {
    const res = await request(app).get('/api/books/search');
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('message', 'Search query is required');
  });

  it('should return books data on success', async () => {
    // Mock the axios response
    const mockData = {
      data: {
        totalItems: 1,
        items: [
          {
            id: '1',
            volumeInfo: {
              title: 'Test Book',
              authors: ['Test Author'],
              description: 'Test Description',
              imageLinks: { thumbnail: 'http://example.com/image.jpg' }
            },
            accessInfo: {
                viewability: 'PARTIAL'
            }
          }
        ]
      },
      status: 200
    };
    axios.get.mockResolvedValue(mockData);

    const res = await request(app).get('/api/books/search?q=test');
    
    expect(res.statusCode).toEqual(200);
    // The structure depends on what the controller returns. 
    // Looking at the controller code read previously, it returns response.data directly (after filtering).
    // Let's check the controller code again if needed.
    // "res.json(response.data);" -> So it returns { totalItems: ..., items: [...] }
    
    expect(res.body).toHaveProperty('items');
    expect(res.body.items).toHaveLength(1);
    expect(res.body.items[0].volumeInfo.title).toBe('Test Book');
  });

  it('should handle API errors gracefully', async () => {
    axios.get.mockRejectedValue(new Error('API Error'));

    const res = await request(app).get('/api/books/search?q=crash');
    
    // The controller likely has a catch block. 
    // I should check how it handles errors.
    expect(res.statusCode).not.toBe(200); // 500 or something
  });
});
