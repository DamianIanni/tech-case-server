"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getUsers_1 = require("../../../src/services/user/getUsers");
const getAllUsersQuery_1 = require("../../../src/db/users/getAllUsersQuery");
const { mockFunction } = require('../../testUtils');
describe('getAllUsersService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should call getAllUsersQuery with center_id and return result', async () => {
        mockFunction(getAllUsersQuery_1, 'getAllUsersQuery', [{ id: 'u1', name: 'User1' }]);
        const result = await (0, getUsers_1.getAllUsersService)('center1');
        expect(getAllUsersQuery_1.getAllUsersQuery).toHaveBeenCalledWith('center1');
        expect(result).toEqual([{ id: 'u1', name: 'User1' }]);
    });
});
describe('getUserByIdService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should call getUserByIdQuery with user_id and return result', async () => {
        mockFunction(getAllUsersQuery_1, 'getUserByIdQuery', { id: 'u1', name: 'User1' });
        const result = await (0, getUsers_1.getUserByIdService)('u1');
        expect(getAllUsersQuery_1.getUserByIdQuery).toHaveBeenCalledWith('u1');
        expect(result).toEqual({ id: 'u1', name: 'User1' });
    });
});
