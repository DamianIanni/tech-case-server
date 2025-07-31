import { validateSchemaMiddleware } from '../../src/middlewares/validateSchema';
import httpMocks from 'node-mocks-http';

describe('validateSchemaMiddleware', () => {
  it('should call next if schema is valid', () => {
    const schema = { validate: jest.fn().mockReturnValue({}) };
    const req = httpMocks.createRequest({ body: {} });
    const res = httpMocks.createResponse();
    const next = jest.fn();
    validateSchemaMiddleware(schema as any, 'body')(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  it('should return 400 if schema is invalid', () => {
    const schema = { validate: jest.fn().mockReturnValue({ error: { details: [{ message: 'Invalid' }] } }) };
    const req = httpMocks.createRequest({ body: {} });
    const res = httpMocks.createResponse();
    const next = jest.fn();
    validateSchemaMiddleware(schema as any, 'body')(req, res, next);
    expect(res.statusCode).toBe(400);
    expect(res._getJSONData()).toMatchObject({ error: 'Invalid' });
    expect(next).not.toHaveBeenCalled();
  });
});
