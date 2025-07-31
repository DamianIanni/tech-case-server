import { userExistMiddleware } from '../../../src/middlewares/auth/userExist';
import httpMocks from 'node-mocks-http';

jest.mock('../../../src/services/helpers/findUserByEmail', () => ({
  findUserByEmail: jest.fn()
}));
const { findUserByEmail } = require('../../../src/services/helpers/findUserByEmail');

describe('userExistMiddleware', () => {
  it('should return 409 if user already exists', async () => {
    findUserByEmail.mockResolvedValueOnce({ rowCount: 1 });
    const req = httpMocks.createRequest({ body: { email: 'exists@test.com' } });
    const res = httpMocks.createResponse();
    const next = jest.fn();
    await userExistMiddleware(req, res, next);
    expect(res.statusCode).toBe(409);
    expect(res._getJSONData()).toMatchObject({ message: 'User already exists' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should call next if user does not exist', async () => {
    findUserByEmail.mockResolvedValueOnce({ rowCount: 0 });
    const req = httpMocks.createRequest({ body: { email: 'notexists@test.com' } });
    const res = httpMocks.createResponse();
    const next = jest.fn();
    await userExistMiddleware(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});
