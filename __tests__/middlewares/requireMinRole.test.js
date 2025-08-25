"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const requireMinRole_1 = require("../../src/middlewares/requireMinRole");
const node_mocks_http_1 = __importDefault(require("node-mocks-http"));
jest.mock('../../src/config/database', () => ({
    dbpool: { query: jest.fn() }
}));
const { dbpool } = require('../../src/config/database');
describe('requireMinRole', () => {
    it('should call next if user has required role', async () => {
        dbpool.query.mockResolvedValueOnce({ rows: [{ role: 'admin' }] });
        const middleware = (0, requireMinRole_1.requireMinRole)('manager');
        const req = node_mocks_http_1.default.createRequest({ user: { id: 1 } });
        const res = node_mocks_http_1.default.createResponse();
        const next = jest.fn();
        await middleware(req, res, next);
        expect(next).toHaveBeenCalled();
    });
    it('should return 403 if user does not have required role', async () => {
        dbpool.query.mockResolvedValueOnce({ rows: [{ role: 'employee' }] });
        const middleware = (0, requireMinRole_1.requireMinRole)('manager');
        const req = node_mocks_http_1.default.createRequest({ user: { id: 1 } });
        const res = node_mocks_http_1.default.createResponse();
        const next = jest.fn();
        await middleware(req, res, next);
        expect(res.statusCode).toBe(403);
        expect(res._getJSONData()).toMatchObject({ message: 'Access denied' });
        expect(next).not.toHaveBeenCalled();
    });
});
