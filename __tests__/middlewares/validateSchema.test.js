"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validateSchema_1 = require("../../src/middlewares/validateSchema");
const node_mocks_http_1 = __importDefault(require("node-mocks-http"));
describe('validateSchemaMiddleware', () => {
    it('should call next if schema is valid', () => {
        const schema = { 
            safeParse: jest.fn().mockReturnValue({ 
                success: true, 
                data: { validatedData: true } 
            }) 
        };
        const req = node_mocks_http_1.default.createRequest({ body: {} });
        const res = node_mocks_http_1.default.createResponse();
        const next = jest.fn();
        (0, validateSchema_1.validateSchemaMiddleware)(schema, 'body')(req, res, next);
        expect(next).toHaveBeenCalled();
        expect(req.body).toEqual({ validatedData: true });
    });
    it('should return 400 if schema is invalid', () => {
        const schema = { 
            safeParse: jest.fn().mockReturnValue({ 
                success: false, 
                error: { 
                    issues: [{ message: 'Invalid field' }] 
                } 
            }) 
        };
        const req = node_mocks_http_1.default.createRequest({ body: {} });
        const res = node_mocks_http_1.default.createResponse();
        const next = jest.fn();
        (0, validateSchema_1.validateSchemaMiddleware)(schema, 'body')(req, res, next);
        expect(res.statusCode).toBe(400);
        expect(res._getJSONData()).toMatchObject({ 
            status: 'error',
            error: {
                message: 'Invalid field',
                code: 'VALIDATION_FAILED'
            }
        });
        expect(next).not.toHaveBeenCalled();
    });
});
