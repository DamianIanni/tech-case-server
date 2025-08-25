"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passwordMidleware_1 = require("../../../src/middlewares/auth/passwordMidleware");
const node_mocks_http_1 = __importDefault(require("node-mocks-http"));
const bcrypt = require('bcrypt');
const findUserByEmailQuery_1 = require("../../../src/db/helpers/findUserByEmailQuery");
const mockedFindUserByEmailQuery = findUserByEmailQuery_1.findUserByEmailQuery;
jest.mock('../../../src/db/helpers/findUserByEmailQuery');
jest.mock('bcrypt', () => ({
    __esModule: true,
    default: { compare: jest.fn() }
}));
const mockedBcrypt = bcrypt;
beforeEach(() => {
    jest.clearAllMocks();
});
describe('passwordMiddleware', () => {
    it('should call next if credentials are valid', async () => {
        mockedFindUserByEmailQuery.mockResolvedValueOnce({ rows: [{ password: 'hashed', email: 'test@test.com', id: 1, first_name: 'Test', last_name: 'User' }], command: '', rowCount: 1, oid: 0, fields: [] });
        bcrypt.default.compare.mockResolvedValueOnce(true);
        const req = node_mocks_http_1.default.createRequest({ body: { email: 'test@test.com', password: 'pass' } });
        const res = node_mocks_http_1.default.createResponse();
        const next = jest.fn();
        await (0, passwordMidleware_1.passwordMiddlewareHandler)(req, res, next);
        expect(next).toHaveBeenCalled();
        expect(res.locals.user).toBeDefined();
    });
    it('should return 401 if user not found', async () => {
        mockedFindUserByEmailQuery.mockResolvedValueOnce(null);
        const req = node_mocks_http_1.default.createRequest({ body: { email: 'notfound@test.com', password: 'pass' } });
        const res = node_mocks_http_1.default.createResponse();
        const next = jest.fn();
        await (0, passwordMidleware_1.passwordMiddlewareHandler)(req, res, next);
        expect(res.statusCode).toBe(401);
        expect(res._getJSONData()).toMatchObject({ message: 'Invalid credentials' });
        expect(next).not.toHaveBeenCalled();
    });
    it('should return 401 if password does not match', async () => {
        mockedFindUserByEmailQuery.mockResolvedValueOnce({ rows: [{ password: 'hashed' }], command: '', rowCount: 1, oid: 0, fields: [] });
        bcrypt.default.compare.mockResolvedValueOnce(false);
        const req = node_mocks_http_1.default.createRequest({ body: { email: 'test@test.com', password: 'wrong' } });
        const res = node_mocks_http_1.default.createResponse();
        const next = jest.fn();
        await (0, passwordMidleware_1.passwordMiddlewareHandler)(req, res, next);
        expect(res.statusCode).toBe(401);
        expect(res._getJSONData()).toMatchObject({ message: 'Invalid credentials' });
        expect(next).not.toHaveBeenCalled();
    });
});
