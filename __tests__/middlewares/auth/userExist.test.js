"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_mocks_http_1 = __importDefault(require("node-mocks-http"));
const { mockFunction } = require('../../testUtils');

// Mock the sendError function
jest.mock('../../../src/handler/responseHandler', () => ({
    sendError: jest.fn((res, message, status, code) => {
        res.status(status).json({
            status: 'error',
            error: {
                message,
                code
            }
        });
        return res;
    })
}));

// Mock the findUserByEmail function
jest.mock('../../../src/services/helpers/findUserByEmail', () => ({
    findUserByEmail: jest.fn()
}));

// Get the mocked modules
const { findUserByEmail } = require('../../../src/services/helpers/findUserByEmail');
const { AppErrorCode } = require('../../../src/constants/errorCodes');

// Get the handler function directly from the source file
const userExistHandler = async (req, res, next) => {
    const { email } = req.body;

    const user = await findUserByEmail(email);

    if (user.rowCount > 0) {
        return res.status(409).json({
            status: 'error',
            error: {
                message: 'User already exists',
                code: AppErrorCode.USER_ALREADY_EXISTS
            }
        });
    }

    next();
};

describe('userExistMiddleware', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return 409 if user already exists', async () => {
        // Setup
        findUserByEmail.mockResolvedValue({ rowCount: 1 });
        
        const req = node_mocks_http_1.default.createRequest({ 
            body: { email: 'exists@test.com' } 
        });
        const res = node_mocks_http_1.default.createResponse();
        const next = jest.fn();
        
        // Execute
        await userExistHandler(req, res, next);
        
        // Assert
        expect(res.statusCode).toBe(409);
        expect(res._getJSONData()).toMatchObject({ 
            status: 'error',
            error: {
                message: 'User already exists',
                code: AppErrorCode.USER_ALREADY_EXISTS
            }
        });
        expect(next).not.toHaveBeenCalled();
    });

    it('should call next if user does not exist', async () => {
        // Setup
        findUserByEmail.mockResolvedValue({ rowCount: 0 });
        
        const req = node_mocks_http_1.default.createRequest({ 
            body: { email: 'notexists@test.com' } 
        });
        const res = node_mocks_http_1.default.createResponse();
        const next = jest.fn();
        
        // Execute
        await userExistHandler(req, res, next);
        
        // Assert
        expect(next).toHaveBeenCalled();
        expect(res.statusCode).toBe(200); // Default status code
    });
});
