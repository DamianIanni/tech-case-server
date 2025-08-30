"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const register_1 = require("../../../src/services/auth/register");
const hashPassword_1 = require("../../../src/utils/auth/hashPassword");
const registerUserQuery_1 = require("../../../src/db/auth/registerUserQuery");
const { mockFunction } = require('../../testUtils');
describe('registerUserService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('should hash the password and call registerUserQuery with hashed password', async () => {
        mockFunction(hashPassword_1, 'hashPassword', 'hashedpass');
        mockFunction(registerUserQuery_1, 'registerUserQuery', { success: true });
        const props = {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com',
            password: 'plainpass',
        };
        const result = await (0, register_1.registerUserService)(props);
        expect(hashPassword_1.hashPassword).toHaveBeenCalledWith('plainpass');
        expect(registerUserQuery_1.registerUserQuery).toHaveBeenCalledWith({
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com',
            password: 'hashedpass',
        });
        expect(result).toEqual({ success: true });
    });
    it('should throw if password is missing', async () => {
        await expect((0, register_1.registerUserService)({
            firstName: 'Jane',
            lastName: 'Smith',
            email: 'jane@example.com',
        })).rejects.toThrow();
    });
});
