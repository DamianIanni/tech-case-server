"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const updateMe_1 = require("../../../src/services/account/updateMe");

// Mock dependencies
jest.mock('../../../src/db/users/uptadeUserquery', () => ({
    updateUserQuery: jest.fn().mockResolvedValue(undefined)
}));

jest.mock('../../../src/utils/buildDynamicUpdate', () => ({
    buildDynamicUpdate: jest.fn().mockReturnValue({
        query: 'UPDATE users SET first_name = $1 WHERE id = $2',
        values: ['John', 'user123']
    })
}));

describe('updateMeService', () => {
    it('should update firstName and lastName', async () => {
        const result = await updateMe_1.updateMeService('user123', { first_name: 'John', last_name: 'Doe' });
        expect(result).toEqual({ message: 'User updated' });
    });

    it('should throw if no data provided', async () => {
        await expect(updateMe_1.updateMeService('user123', {}))
            .rejects
            .toThrow('No data to update');
    });
});

