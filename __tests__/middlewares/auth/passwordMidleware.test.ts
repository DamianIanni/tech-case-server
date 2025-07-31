import { passwordMiddlewareHandler } from '../../../src/middlewares/auth/passwordMidleware';
import httpMocks from 'node-mocks-http';
const bcrypt = require('bcrypt');
import { findUserByEmailQuery } from '../../../src/db/helpers/findUserByEmailQuery';

const mockedFindUserByEmailQuery = findUserByEmailQuery as jest.MockedFunction<typeof findUserByEmailQuery>;

jest.mock('../../../src/db/helpers/findUserByEmailQuery');
jest.mock('bcrypt', () => ({
  __esModule: true,
  default: { compare: jest.fn() }
}));

const mockedBcrypt = bcrypt as unknown as { compare: jest.Mock };

beforeEach(() => {
  jest.clearAllMocks();
});

describe('passwordMiddleware', () => {
  it('should call next if credentials are valid', async () => {
    mockedFindUserByEmailQuery.mockResolvedValueOnce({ rows: [{ password: 'hashed', email: 'test@test.com', id: 1, first_name: 'Test', last_name: 'User' }], command: '', rowCount: 1, oid: 0, fields: [] });
    (bcrypt as any).default.compare.mockResolvedValueOnce(true);
    const req = httpMocks.createRequest({ body: { email: 'test@test.com', password: 'pass' } });
    const res = httpMocks.createResponse();
    const next = jest.fn();
    await passwordMiddlewareHandler(req, res, next);
    expect(next).toHaveBeenCalled();
    expect(res.locals.user).toBeDefined();
  });

  it('should return 401 if user not found', async () => {
    mockedFindUserByEmailQuery.mockResolvedValueOnce(null as any);
    const req = httpMocks.createRequest({ body: { email: 'notfound@test.com', password: 'pass' } });
    const res = httpMocks.createResponse();
    const next = jest.fn();
    await passwordMiddlewareHandler(req, res, next);
    expect(res.statusCode).toBe(401);
    expect(res._getJSONData()).toMatchObject({ message: 'Invalid credentials' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 401 if password does not match', async () => {
    mockedFindUserByEmailQuery.mockResolvedValueOnce({ rows: [{ password: 'hashed' }], command: '', rowCount: 1, oid: 0, fields: [] });
    (bcrypt as any).default.compare.mockResolvedValueOnce(false);
    const req = httpMocks.createRequest({ body: { email: 'test@test.com', password: 'wrong' } });
    const res = httpMocks.createResponse();
    const next = jest.fn();
    await passwordMiddlewareHandler(req, res, next);
    expect(res.statusCode).toBe(401);
    expect(res._getJSONData()).toMatchObject({ message: 'Invalid credentials' });
    expect(next).not.toHaveBeenCalled();
  });
});
