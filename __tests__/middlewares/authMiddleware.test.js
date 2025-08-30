"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });

// Mock database before importing modules that use it
const mockDbPool = {
    query: jest.fn()
};

jest.mock('../../src/config/database', () => ({
    dbpool: mockDbPool
}));

// Mock jsonwebtoken
jest.mock('jsonwebtoken', () => ({
    verify: jest.fn()
}));

// Import modules after mocking
const authMiddleware_1 = require("../../src/middlewares/authMiddleware");
const node_mocks_http_1 = __importDefault(require("node-mocks-http"));
const { mockFunction } = require('../testUtils');
const jwt = require('jsonwebtoken');
describe('authMiddleware', () => {
    it('should call next and attach user if token is valid', async () => {
        // Setup mock for JWT verify - use mockImplementation to handle the async nature
        const userPayload = { id: 1, center_id: 'center1', name: 'Test' };
        jwt.verify.mockImplementation((token, secret) => userPayload);
        
        // Setup mock database response
        mockDbPool.query.mockResolvedValueOnce({
            rows: [{ id: 1, first_name: 'Test', last_name: 'User', email: 'test@example.com', role: 'admin', center_id: 'center1' }],
            rowCount: 1
        });
        
        // Create request with cookie
        const req = node_mocks_http_1.default.createRequest({
            cookies: { token: 'valid-token' }
        });
        const res = node_mocks_http_1.default.createResponse();
        const next = jest.fn();
        
        // Execute middleware
        await (0, authMiddleware_1.authMiddleware)(req, res, next);
        
        // Verify expectations
        expect(jwt.verify).toHaveBeenCalledWith('valid-token', expect.any(String));
        expect(next).toHaveBeenCalled();
        expect(req.user).toEqual(userPayload);
    });
    it('should return 401 if no token cookie', async () => {
        // Create request with no cookies
        const req = node_mocks_http_1.default.createRequest();
        const res = node_mocks_http_1.default.createResponse();
        const next = jest.fn();
        
        // Execute middleware
        await (0, authMiddleware_1.authMiddleware)(req, res, next);
        
        // Verify expectations
        expect(res.statusCode).toBe(401);
        expect(res._getJSONData()).toMatchObject({ 
            status: 'error',
            error: {
                message: 'Access denied. Authentication required.',
                code: 'AUTH_ACCESS_DENIED'
            }
        });
        expect(next).not.toHaveBeenCalled();
    });
    it('should return 401 if token is invalid', async () => {
        // Setup mock to throw an error
        jwt.verify.mockImplementation(() => { throw new Error('Invalid token'); });
        
        // Create request with invalid cookie token
        const req = node_mocks_http_1.default.createRequest({
            cookies: { token: 'invalid-token' }
        });
        const res = node_mocks_http_1.default.createResponse();
        const next = jest.fn();
        
        // Execute middleware
        await (0, authMiddleware_1.authMiddleware)(req, res, next);
        
        // Verify expectations
        expect(res.statusCode).toBe(401);
        // The middleware silently fails on JWT errors and continues to the final error
        expect(res._getJSONData()).toMatchObject({ 
            status: 'error',
            error: {
                message: 'Access denied. Authentication required.',
                code: 'AUTH_ACCESS_DENIED'
            }
        });
        expect(next).not.toHaveBeenCalled();
    });
    
    it('should return 401 if user not found in database', async () => {
        // Setup mock for JWT verify
        const userPayload = { id: 1, center_id: 'center1' };
        mockFunction(jwt, 'verify', userPayload);
        
        // Setup mock database response - no user found
        mockDbPool.query.mockResolvedValueOnce({
            rows: [],
            rowCount: 0
        });
        
        // Create request with cookie
        const req = node_mocks_http_1.default.createRequest({
            cookies: { token: 'valid-token-invalid-user' }
        });
        const res = node_mocks_http_1.default.createResponse();
        const next = jest.fn();
        
        // Execute middleware
        await (0, authMiddleware_1.authMiddleware)(req, res, next);
        
        // Verify expectations
        expect(res.statusCode).toBe(401);
        expect(res._getJSONData()).toMatchObject({ 
            status: 'error',
            error: {
                message: 'Invalid session.',
                code: 'AUTH_SESSION_INVALID'
            }
        });
        expect(next).not.toHaveBeenCalled();
    });
});
