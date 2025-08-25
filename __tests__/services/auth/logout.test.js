"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logout_1 = require("../../../src/services/auth/logout");
describe('logoutUserService', () => {
    it('should return logout success message', async () => {
        const result = await (0, logout_1.logoutUserService)();
        expect(result).toEqual({ message: 'Successfully logged out' });
    });
});
