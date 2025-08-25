"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authMiddleware_1 = require("../../src/middlewares/authMiddleware");
const node_mocks_http_1 = __importDefault(require("node-mocks-http"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
jest.mock('jsonwebtoken');
const mockedJwt = jsonwebtoken_1.default;
describe('authMiddleware', () => {
    it('should call next and attach user if token is valid', () => {
        mockedJwt.verify.mockReturnValue({ id: 1, name: 'Test' });
        const req = node_mocks_http_1.default.createRequest({ headers: { authorization: 'Bearer validtoken' } });
        const res = node_mocks_http_1.default.createResponse();
        const next = jest.fn();
        (0, authMiddleware_1.authMiddleware)(req, res, next);
        expect(next).toHaveBeenCalled();
        expect(req.user).toEqual({ id: 1, name: 'Test' });
    });
    it('should return 401 if no authorization header', () => {
        const req = node_mocks_http_1.default.createRequest();
        const res = node_mocks_http_1.default.createResponse();
        const next = jest.fn();
        (0, authMiddleware_1.authMiddleware)(req, res, next);
        expect(res.statusCode).toBe(401);
        expect(res._getJSONData()).toMatchObject({ message: 'Unauthorized' });
        expect(next).not.toHaveBeenCalled();
    });
    it('should return 401 if token is invalid', () => {
        mockedJwt.verify.mockImplementation(() => { throw new Error('Invalid token'); });
        const req = node_mocks_http_1.default.createRequest({ headers: { authorization: 'Bearer invalidtoken' } });
        const res = node_mocks_http_1.default.createResponse();
        const next = jest.fn();
        (0, authMiddleware_1.authMiddleware)(req, res, next);
        expect(res.statusCode).toBe(401);
        expect(res._getJSONData()).toMatchObject({ message: 'Invalid token' });
        expect(next).not.toHaveBeenCalled();
    });
});
