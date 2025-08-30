"use strict";

// Mock dependencies before importing modules
jest.mock('../../../src/db/users/uptadeUserquery');
jest.mock('../../../src/utils/auth/hashPassword');
jest.mock('../../../src/utils/buildDynamicUpdate');

// Import dependencies after mocking
const { updateUserService } = require("../../../src/services/user/updateUser");
const { updateUserQuery } = require("../../../src/db/users/uptadeUserquery");
const { hashPassword } = require("../../../src/utils/auth/hashPassword");
const { buildDynamicUpdate } = require("../../../src/utils/buildDynamicUpdate");
describe('updateUserService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should update user fields and call updateUserQuery for users and user_centers', async () => {
        // Setup mocks
        hashPassword.mockImplementation((password) => {
            return Promise.resolve('hashed');
        });
        
        buildDynamicUpdate.mockImplementation((table, data, where) => {
            return { 
                query: `UPDATE ${table}`, 
                values: Object.values(data).concat(where.value) 
            };
        });
        
        updateUserQuery.mockImplementation((query, values) => {
            return Promise.resolve({});
        });
        
        const updateData = { first_name: 'New', last_name: 'Name', password: 'pass', role: 'admin', status: 'active' };
        await updateUserService('center1', 'u1', updateData);
        // Users table update
        expect(buildDynamicUpdate).toHaveBeenCalledWith('users', expect.objectContaining({ first_name: 'New', last_name: 'Name', password: 'hashed' }), { column: 'id', value: 'u1' });
        expect(updateUserQuery).toHaveBeenCalledWith('UPDATE users', expect.arrayContaining(['New', 'Name', 'hashed', 'u1']));
        
        // User centers table update
        expect(buildDynamicUpdate).toHaveBeenCalledWith('user_centers', expect.objectContaining({ role: 'admin', status: 'active' }), { column: 'user_id', value: 'u1' });
        expect(updateUserQuery).toHaveBeenCalledWith(expect.stringContaining('UPDATE user_centers'), expect.arrayContaining(['admin', 'active', 'u1', 'center1']));
    });
    it('should not call updateUserQuery if no updateData provided', async () => {
        // Reset mocks
        jest.clearAllMocks();
        
        await updateUserService('center1', 'u1', {});
        expect(updateUserQuery).not.toHaveBeenCalled();
    });
});
