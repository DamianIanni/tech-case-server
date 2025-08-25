"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authAdminInCenter_1 = require("../../src/middlewares/authAdminInCenter");
const node_mocks_http_1 = __importDefault(require("node-mocks-http"));
jest.mock('../../src/config/database', () => ({
    dbpool: { query: jest.fn() }
}));
const { dbpool } = require('../../src/config/database');
describe('authorizeAdminInCenter', () => {
    it('should call next if user is admin', async () => {
        dbpool.query.mockResolvedValueOnce({ rowCount: 1, rows: [{ role: 'admin' }] });
        const req = node_mocks_http_1.default.createRequest({ params: { center_id: 1 }, user: { id: 1 } });
        const res = node_mocks_http_1.default.createResponse();
        const next = jest.fn();
        await (0, authAdminInCenter_1.authorizeAdminInCenter)(req, res, next);
        expect(next).toHaveBeenCalled();
        expect(req.auth).toEqual({ role: 'admin', center_id: 1 });
    });
    it('should return 403 if unauthorized or center not found', async () => {
        dbpool.query.mockResolvedValueOnce({ rowCount: 0 });
        const req = node_mocks_http_1.default.createRequest({ params: { center_id: 1 }, user: { id: 1 } });
        const res = node_mocks_http_1.default.createResponse();
        const next = jest.fn();
        await (0, authAdminInCenter_1.authorizeAdminInCenter)(req, res, next);
        expect(res.statusCode).toBe(403);
        expect(res._getJSONData()).toMatchObject({ message: 'Unauthorized or center not found' });
        expect(next).not.toHaveBeenCalled();
    });
    it('should return 403 if user is not admin', async () => {
        dbpool.query.mockResolvedValueOnce({ rowCount: 1, rows: [{ role: 'manager' }] });
        const req = node_mocks_http_1.default.createRequest({ params: { center_id: 1 }, user: { id: 1 } });
        const res = node_mocks_http_1.default.createResponse();
        const next = jest.fn();
        await (0, authAdminInCenter_1.authorizeAdminInCenter)(req, res, next);
        expect(res.statusCode).toBe(403);
        expect(res._getJSONData()).toMatchObject({ message: 'Only admins can perform this action' });
        expect(next).not.toHaveBeenCalled();
    });
});
