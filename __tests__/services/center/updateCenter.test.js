"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const updateCenter_1 = require("../../../src/services/center/updateCenter");
const updateCenterQuery_1 = require("../../../src/db/center/updateCenterQuery");
jest.mock('../../../src/db/center/updateCenterQuery');
describe('updateCenterService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('should call updateCenterQuery with merged values and return updated center', async () => {
        updateCenterQuery_1.updateCenterQuery.mockResolvedValue({ id: 'c1', name: 'Updated Center' });
        const result = await (0, updateCenter_1.updateCenterService)('c1', { name: 'Updated Center' });
        expect(updateCenterQuery_1.updateCenterQuery).toHaveBeenCalledWith({ id: 'c1', name: 'Updated Center' });
        expect(result).toEqual({ id: 'c1', name: 'Updated Center' });
    });
    it('should handle empty updateData', async () => {
        updateCenterQuery_1.updateCenterQuery.mockResolvedValue({ id: 'c2' });
        const result = await (0, updateCenter_1.updateCenterService)('c2', {});
        expect(updateCenterQuery_1.updateCenterQuery).toHaveBeenCalledWith({ id: 'c2' });
        expect(result).toEqual({ id: 'c2' });
    });
});
