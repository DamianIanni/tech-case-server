"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const deleteUser_1 = require("../../../src/services/user/deleteUser");
const deleteUserQuery_1 = require("../../../src/db/users/deleteUserQuery");
const testUtils_1 = require("../../testUtils");

jest.mock('../../../src/db/users/deleteUserQuery');
describe('deleteUserService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should call deleteUserQuery with user_id', async () => {
        testUtils_1.mockFunction(deleteUserQuery_1, 'deleteUserQuery', { success: true });
        await (0, deleteUser_1.deleteUserService)('u1');
        expect(deleteUserQuery_1.deleteUserQuery).toHaveBeenCalledWith('u1');
    });
});
