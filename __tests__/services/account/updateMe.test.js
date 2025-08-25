"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const updateMe_1 = require("../../../src/services/account/updateMe");
jest.mock('../../../src/utils/auth/hashPassword', () => ({
    hashPassword: jest.fn(async (pw) => `hashed_${pw}`),
}));
jest.mock('../../../src/db/users/uptadeUserquery', () => ({
    updateUserQuery: jest.fn(async () => undefined),
}));
jest.mock('../../../src/utils/buildDynamicUpdate', () => ({
    buildDynamicUpdate: jest.fn((table, data, where) => ({
        query: 'UPDATE users SET ...',
        values: Object.values(data).concat(where.value),
    })),
}));
describe('updateMeService', () => {
    afterEach(() => jest.clearAllMocks());
    it('should update firstName and lastName', async () => {
        const result = await (0, updateMe_1.updateMeService)('user123', { firstName: 'John', lastName: 'Doe' });
        expect(result).toEqual({ message: 'User updated' });
    });
    it('should hash password if provided', async () => {
        const result = await (0, updateMe_1.updateMeService)('user123', { password: 'secret' });
        expect(result).toEqual({ message: 'User updated' });
        const { hashPassword } = require('../../../src/utils/auth/hashPassword');
        expect(hashPassword).toHaveBeenCalledWith('secret');
    });
    it('should throw if no data provided', async () => {
        await expect((0, updateMe_1.updateMeService)('user123', {})).rejects.toThrow('No data to update');
    });
});
