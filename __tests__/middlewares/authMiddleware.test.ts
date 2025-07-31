import { authMiddleware } from '../../src/middlewares/authMiddleware';
import httpMocks from 'node-mocks-http';
import jwt from 'jsonwebtoken';

jest.mock('jsonwebtoken');

const mockedJwt = jwt as jest.Mocked<typeof jwt>;

describe('authMiddleware', () => {
  it('should call next and attach user if token is valid', () => {
    mockedJwt.verify.mockReturnValue({ id: 1, name: 'Test' } as any);
    const req = httpMocks.createRequest({ headers: { authorization: 'Bearer validtoken' } });
    const res = httpMocks.createResponse();
    const next = jest.fn();
    authMiddleware(req, res, next);
    expect(next).toHaveBeenCalled();
    expect(req.user).toEqual({ id: 1, name: 'Test' });
  });

  it('should return 401 if no authorization header', () => {
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();
    const next = jest.fn();
    authMiddleware(req, res, next);
    expect(res.statusCode).toBe(401);
    expect(res._getJSONData()).toMatchObject({ message: 'Unauthorized' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 401 if token is invalid', () => {
    mockedJwt.verify.mockImplementation(() => { throw new Error('Invalid token'); });
    const req = httpMocks.createRequest({ headers: { authorization: 'Bearer invalidtoken' } });
    const res = httpMocks.createResponse();
    const next = jest.fn();
    authMiddleware(req, res, next);
    expect(res.statusCode).toBe(401);
    expect(res._getJSONData()).toMatchObject({ message: 'Invalid token' });
    expect(next).not.toHaveBeenCalled();
  });
});
