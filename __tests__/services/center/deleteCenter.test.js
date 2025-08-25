"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const deleteCenter_1 = require("../../../src/services/center/deleteCenter");
const deleteCenterQuery_1 = require("../../../src/db/center/deleteCenterQuery");
jest.mock('../../../src/db/center/deleteCenterQuery');
describe('deleteCenterService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('should call deleteCenterQuery with the centerId and return result', async () => {
        deleteCenterQuery_1.deleteCenterQuery.mockResolvedValue({ success: true });
        const result = await (0, deleteCenter_1.deleteCenterService)('center123');
        expect(deleteCenterQuery_1.deleteCenterQuery).toHaveBeenCalledWith('center123');
        expect(result).toEqual({ success: true });
    });
});
