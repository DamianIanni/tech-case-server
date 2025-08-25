"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const findUserByEmail_1 = require("../../../src/services/helpers/findUserByEmail");
const findUserByEmailQuery_1 = require("../../../src/db/helpers/findUserByEmailQuery");
jest.mock('../../../src/db/helpers/findUserByEmailQuery');
describe('findUserByEmail', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('should call findUserByEmailQuery with email and true, and return result', async () => {
        findUserByEmailQuery_1.findUserByEmailQuery.mockResolvedValue({ rows: [{ id: 1, email: 'a@b.com' }] });
        const result = await (0, findUserByEmail_1.findUserByEmail)('a@b.com');
        expect(findUserByEmailQuery_1.findUserByEmailQuery).toHaveBeenCalledWith('a@b.com', true);
        expect(result).toEqual({ rows: [{ id: 1, email: 'a@b.com' }] });
    });
});
