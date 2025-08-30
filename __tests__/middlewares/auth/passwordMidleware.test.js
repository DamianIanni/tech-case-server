"use strict";

// Mock dependencies before importing any modules
jest.mock('../../../src/db/helpers/findUserByEmailQuery');
jest.mock('bcrypt');

// Import dependencies after mocking
const httpMocks = require('node-mocks-http');
const { passwordMiddlewareHandler } = require('../../../src/middlewares/auth/passwordMidleware');
const { findUserByEmailQuery } = require('../../../src/db/helpers/findUserByEmailQuery');
const bcrypt = require('bcrypt');

describe('passwordMiddleware', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call next if credentials are valid', async () => {
    // Mock user data
    const mockUser = {
      rows: [{
        id: 1,
        email: 'test@test.com',
        password: 'hashedPassword',
        first_name: 'Test',
        last_name: 'User'
      }],
      rowCount: 1
    };

    // Setup mocks
    findUserByEmailQuery.mockImplementation((email) => {
      return Promise.resolve(mockUser);
    });
    
    bcrypt.compare = jest.fn().mockImplementation((password, hash) => {
      return Promise.resolve(true);
    });

    // Setup request and response
    const req = httpMocks.createRequest({
      method: 'POST',
      body: {
        email: 'test@test.com',
        password: 'password123'
      }
    });
    const res = httpMocks.createResponse();
    const next = jest.fn();

    // Call the middleware
    await passwordMiddlewareHandler(req, res, next);

    // Assertions
    expect(findUserByEmailQuery).toHaveBeenCalledWith('test@test.com');
    expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashedPassword');
    expect(next).toHaveBeenCalled();
    expect(res.locals.user).toEqual({
      id: 1,
      email: 'test@test.com',
      first_name: 'Test',
      last_name: 'User'
    });
  });

  it('should return 401 if user not found', async () => {
    // Setup mocks
    findUserByEmailQuery.mockImplementation((email) => {
      return Promise.resolve(null);
    });

    // Setup request and response
    const req = httpMocks.createRequest({
      method: 'POST',
      body: {
        email: 'nonexistent@test.com',
        password: 'password123'
      }
    });
    const res = httpMocks.createResponse();
    const next = jest.fn();

    // Call the middleware
    await passwordMiddlewareHandler(req, res, next);

    // Assertions
    expect(findUserByEmailQuery).toHaveBeenCalledWith('nonexistent@test.com');
    expect(bcrypt.compare).not.toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
    expect(res.statusCode).toBe(401);
    expect(res._getJSONData()).toEqual({
      status: 'error',
      error: {
        message: 'Invalid credentials',
        code: 'AUTH_INVALID_CREDENTIALS'
      }
    });
  });

  it('should return 401 if password does not match', async () => {
    // Mock user data
    const mockUser = {
      rows: [{
        id: 1,
        email: 'test@test.com',
        password: 'hashedPassword',
        first_name: 'Test',
        last_name: 'User'
      }],
      rowCount: 1
    };

    // Setup mocks
    findUserByEmailQuery.mockImplementation((email) => {
      return Promise.resolve(mockUser);
    });
    
    bcrypt.compare = jest.fn().mockImplementation((password, hash) => {
      return Promise.resolve(false);
    });

    // Setup request and response
    const req = httpMocks.createRequest({
      method: 'POST',
      body: {
        email: 'test@test.com',
        password: 'wrongpassword'
      }
    });
    const res = httpMocks.createResponse();
    const next = jest.fn();

    // Call the middleware
    await passwordMiddlewareHandler(req, res, next);

    // Assertions
    expect(findUserByEmailQuery).toHaveBeenCalledWith('test@test.com');
    expect(bcrypt.compare).toHaveBeenCalledWith('wrongpassword', 'hashedPassword');
    expect(next).not.toHaveBeenCalled();
    expect(res.statusCode).toBe(401);
    expect(res._getJSONData()).toEqual({
      status: 'error',
      error: {
        message: 'Invalid credentials',
        code: 'AUTH_INVALID_CREDENTIALS'
      }
    });
  });
});

