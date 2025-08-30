import { validateSchemaMiddleware } from '../../src/middlewares/validateSchema';
import httpMocks from 'node-mocks-http';

describe('validateSchemaMiddleware', () => {
  it('should call next if schema is valid', () => {
    const schema = { safeParse: jest.fn().mockReturnValue({ success: true, data: {} }) };
    const req = httpMocks.createRequest({ body: {} });
    const res = httpMocks.createResponse();
    const next = jest.fn();
    validateSchemaMiddleware(schema as any, 'body')(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  it('should return 400 if schema is invalid', () => {
    const schema = { safeParse: jest.fn().mockReturnValue({ 
      success: false, 
      error: { 
        issues: [{ message: 'Invalid' }] 
      } 
    }) };
    const req = httpMocks.createRequest({ body: {} });
    const res = httpMocks.createResponse();
    const next = jest.fn();
    validateSchemaMiddleware(schema as any, 'body')(req, res, next);
    expect(res.statusCode).toBe(400);
    expect(res._getJSONData()).toMatchObject({ 
      status: 'error',
      error: {
        message: 'Invalid',
        code: 'VALIDATION_FAILED'
      }
    });
    expect(next).not.toHaveBeenCalled();
  });
});
