import { authMiddleware } from '../../src/middlewares/authMiddleware';
import httpMocks from 'node-mocks-http';
import jwt from 'jsonwebtoken';

jest.mock('jsonwebtoken');
jest.mock('../../src/config/database', () => ({
  dbpool: {
    query: jest.fn()
  }
}));

const { dbpool } = require('../../src/config/database');

const mockedJwt = jwt as jest.Mocked<typeof jwt>;

describe('authMiddleware', () => {
  it('should call next and attach user if token is valid', async () => {
    const mockUser = { id: 1, center_id: 'center1' };
    mockedJwt.verify.mockReturnValue(mockUser as any);
    
    // Mock the database query response
    (dbpool.query as jest.Mock).mockResolvedValue({
      rows: [{ id: 1, first_name: 'Test', last_name: 'User', email: 'test@example.com', role: 'admin', center_id: 'center1' }]
    });
    
    const req = httpMocks.createRequest({ cookies: { token: 'validtoken' } });
    const res = httpMocks.createResponse();
    const next = jest.fn();
    
    await authMiddleware(req, res, next);
    expect(next).toHaveBeenCalled();
    expect(req.user).toEqual(mockUser);
  });

  it('should return 401 if no authorization header', async () => {
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();
    const next = jest.fn();
    await authMiddleware(req, res, next);
    expect(res.statusCode).toBe(401);
    expect(res._getJSONData()).toMatchObject({ 
      status: 'error',
      error: {
        message: 'Access denied. Authentication required.',
        code: 'AUTH_ACCESS_DENIED'
      }
    });
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 401 if token is invalid', async () => {
    mockedJwt.verify.mockImplementation(() => { throw new Error('Invalid token'); });
    const req = httpMocks.createRequest({ cookies: { token: 'invalidtoken' } });
    const res = httpMocks.createResponse();
    const next = jest.fn();
    await authMiddleware(req, res, next);
    expect(res.statusCode).toBe(401);
    expect(res._getJSONData()).toMatchObject({ 
      status: 'error',
      error: {
        message: 'Access denied. Authentication required.',
        code: 'AUTH_ACCESS_DENIED'
      }
    });
    expect(next).not.toHaveBeenCalled();
  });
});
