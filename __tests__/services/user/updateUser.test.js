"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const updateUser_1 = require("../../../src/services/user/updateUser");
const uptadeUserquery_1 = require("../../../src/db/users/uptadeUserquery");
const hashPassword_1 = require("../../../src/utils/auth/hashPassword");
const buildDynamicUpdate_1 = require("../../../src/utils/buildDynamicUpdate");
jest.mock('../../../src/db/users/uptadeUserquery');
jest.mock('../../../src/utils/auth/hashPassword');
jest.mock('../../../src/utils/buildDynamicUpdate');
describe('updateUserService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should update user fields and call updateUserQuery for users and user_centers', async () => {
        hashPassword_1.hashPassword.mockResolvedValue('hashed');
        buildDynamicUpdate_1.buildDynamicUpdate.mockImplementation((table, data, where) => ({ query: `UPDATE ${table}`, values: Object.values(data).concat(where.value) }));
        uptadeUserquery_1.updateUserQuery.mockResolvedValue({});
        const updateData = { first_name: 'New', last_name: 'Name', password: 'pass', role: 'admin', status: 'active' };
        await (0, updateUser_1.updateUserService)('center1', 'u1', updateData);
        // Users table update
        expect(buildDynamicUpdate_1.buildDynamicUpdate).toHaveBeenCalledWith('users', expect.objectContaining({ first_name: 'New', last_name: 'Name', password: 'hashed' }), { column: 'id', value: 'u1' });
        expect(uptadeUserquery_1.updateUserQuery).toHaveBeenCalledWith('UPDATE users', expect.arrayContaining(['New', 'Name', 'hashed', 'u1']));
        // User centers table update
        expect(buildDynamicUpdate_1.buildDynamicUpdate).toHaveBeenCalledWith('user_centers', expect.objectContaining({ role: 'admin', status: 'active' }), { column: 'user_id', value: 'u1' });
        expect(uptadeUserquery_1.updateUserQuery).toHaveBeenCalledWith(expect.stringContaining('UPDATE user_centers'), expect.arrayContaining(['admin', 'active', 'u1', 'center1']));
    });
    it('should not call updateUserQuery if no updateData provided', async () => {
        await (0, updateUser_1.updateUserService)('center1', 'u1', {});
        expect(uptadeUserquery_1.updateUserQuery).not.toHaveBeenCalled();
    });
});
