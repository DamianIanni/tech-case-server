import { authorizeAdminInCenter } from '../../src/middlewares/authAdminInCenter';
import httpMocks from 'node-mocks-http';

jest.mock('../../src/config/database', () => ({
  dbpool: { query: jest.fn() }
}));
const { dbpool } = require('../../src/config/database');

describe('authorizeAdminInCenter', () => {
  it('should call next if user is admin', async () => {
    dbpool.query.mockResolvedValueOnce({ rowCount: 1, rows: [{ role: 'admin' }] });
    const req = httpMocks.createRequest({ params: { center_id: 1 }, user: { id: 1 } });
    const res = httpMocks.createResponse();
    const next = jest.fn();
    await authorizeAdminInCenter(req, res, next);
    expect(next).toHaveBeenCalled();
    expect(req.auth).toEqual({ role: 'admin', center_id: 1 });
  });

  it('should return 403 if unauthorized or center not found', async () => {
    dbpool.query.mockResolvedValueOnce({ rowCount: 0 });
    const req = httpMocks.createRequest({ params: { center_id: 1 }, user: { id: 1 } });
    const res = httpMocks.createResponse();
    const next = jest.fn();
    await authorizeAdminInCenter(req, res, next);
    expect(res.statusCode).toBe(403);
    expect(res._getJSONData()).toMatchObject({ message: 'Unauthorized or center not found' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 403 if user is not admin', async () => {
    dbpool.query.mockResolvedValueOnce({ rowCount: 1, rows: [{ role: 'manager' }] });
    const req = httpMocks.createRequest({ params: { center_id: 1 }, user: { id: 1 } });
    const res = httpMocks.createResponse();
    const next = jest.fn();
    await authorizeAdminInCenter(req, res, next);
    expect(res.statusCode).toBe(403);
    expect(res._getJSONData()).toMatchObject({ message: 'Only admins can perform this action' });
    expect(next).not.toHaveBeenCalled();
  });
});
