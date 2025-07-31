import { loggerMiddleware } from '../../src/middlewares/logger';
import httpMocks from 'node-mocks-http';

describe('loggerMiddleware', () => {
  it('should call next and log the request', () => {
    const req = httpMocks.createRequest({ method: 'GET', originalUrl: '/test' });
    const res = httpMocks.createResponse();
    const next = jest.fn();
    console.log = jest.fn();
    loggerMiddleware(req, res, next);
    expect(next).toHaveBeenCalled();
    expect(console.log).toHaveBeenCalled();
  });
});
