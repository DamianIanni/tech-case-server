import { requireMinRole } from '../../src/middlewares/requireMinRole';
import httpMocks from 'node-mocks-http';

jest.mock('../../src/config/database', () => ({
  dbpool: { query: jest.fn() }
}));
const { dbpool } = require('../../src/config/database');

describe('requireMinRole', () => {
  it('should call next if user has required role', async () => {
    dbpool.query.mockResolvedValueOnce({ rows: [{ role: 'admin' }] });
    const middleware = requireMinRole('manager');
    const req = httpMocks.createRequest({ user: { id: 1, role: 'admin' } });
    const res = httpMocks.createResponse();
    const next = jest.fn();
    await middleware(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  it('should return 403 if user does not have required role', async () => {
    dbpool.query.mockResolvedValueOnce({ rows: [{ role: 'employee' }] });
    const middleware = requireMinRole('manager');
    const req = httpMocks.createRequest({ user: { id: 1, role: 'employee' } });
    const res = httpMocks.createResponse();
    const next = jest.fn();
    await middleware(req, res, next);
    expect(res.statusCode).toBe(403);
    expect(res._getJSONData()).toMatchObject({ 
      status: 'error',
      error: {
        message: 'Insufficient privileges. Required role: manager',
        code: 'USER_INSUFFICIENT_PRIVILEGES'
      }
    });
    expect(next).not.toHaveBeenCalled();
  });
});
