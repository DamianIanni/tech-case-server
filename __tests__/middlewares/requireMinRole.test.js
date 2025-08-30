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
        // Set the user role directly in the request object
        const middleware = (0, requireMinRole_1.requireMinRole)('manager');
        const req = node_mocks_http_1.default.createRequest({ 
            user: { 
                id: 1,
                role: 'admin' // Admin role is higher than manager
            } 
        });
        const res = node_mocks_http_1.default.createResponse();
        const next = jest.fn();
        await middleware(req, res, next);
        expect(next).toHaveBeenCalled();
    });
    it('should return 403 if user does not have required role', async () => {
        const middleware = (0, requireMinRole_1.requireMinRole)('manager');
        const req = node_mocks_http_1.default.createRequest({ 
            user: { 
                id: 1,
                role: 'employee' // Employee role is lower than manager
            } 
        });
        const res = node_mocks_http_1.default.createResponse();
        const next = jest.fn();
        await middleware(req, res, next);
        expect(res.statusCode).toBe(403);
        expect(res._getJSONData()).toMatchObject({ 
            status: 'error',
            error: {
                message: 'Insufficient privileges. Required role: manager',
                code: 'USER_INSUFFICIENT_PRIVILEGES'
            }
        });
        expect(next).not.toHaveBeenCalled();
    });
});
