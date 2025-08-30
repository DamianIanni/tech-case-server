"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inviteUser_1 = require("../../../src/services/user/inviteUser");
const addInvitedUserToCenterQuery_1 = require("../../../src/db/users/addInvitedUserToCenterQuery");
const testUtils_1 = require("../../testUtils");

jest.mock('../../../src/db/users/addInvitedUserToCenterQuery');
describe('addInvitedUserService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should call addInvitedUserToCenterQuery with props and return result', async () => {
        testUtils_1.mockFunction(addInvitedUserToCenterQuery_1, 'addInvitedUserToCenterQuery', { id: 'u2', invited: true });
        const props = { email: 'invite@example.com', center_id: 'center1', role: 'admin', user_id: 'u2', status: 'pending' };
        const result = await (0, inviteUser_1.addInvitedUserService)(props);
        expect(addInvitedUserToCenterQuery_1.addInvitedUserToCenterQuery).toHaveBeenCalledWith(props);
        expect(result).toEqual({ id: 'u2', invited: true });
    });
});
