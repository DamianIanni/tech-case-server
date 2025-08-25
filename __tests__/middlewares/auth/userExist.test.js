"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userExist_1 = require("../../../src/middlewares/auth/userExist");
const node_mocks_http_1 = __importDefault(require("node-mocks-http"));
jest.mock('../../../src/services/helpers/findUserByEmail', () => ({
    findUserByEmail: jest.fn()
}));
const { findUserByEmail } = require('../../../src/services/helpers/findUserByEmail');
describe('userExistMiddleware', () => {
    it('should return 409 if user already exists', async () => {
        findUserByEmail.mockResolvedValueOnce({ rowCount: 1 });
        const req = node_mocks_http_1.default.createRequest({ body: { email: 'exists@test.com' } });
        const res = node_mocks_http_1.default.createResponse();
        const next = jest.fn();
        await (0, userExist_1.userExistMiddleware)(req, res, next);
        expect(res.statusCode).toBe(409);
        expect(res._getJSONData()).toMatchObject({ message: 'User already exists' });
        expect(next).not.toHaveBeenCalled();
    });
    it('should call next if user does not exist', async () => {
        findUserByEmail.mockResolvedValueOnce({ rowCount: 0 });
        const req = node_mocks_http_1.default.createRequest({ body: { email: 'notexists@test.com' } });
        const res = node_mocks_http_1.default.createResponse();
        const next = jest.fn();
        await (0, userExist_1.userExistMiddleware)(req, res, next);
        expect(next).toHaveBeenCalled();
    });
});
