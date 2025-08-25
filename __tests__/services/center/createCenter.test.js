"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createCenter_1 = require("../../../src/services/center/createCenter");
const createCenterQuery_1 = require("../../../src/db/center/createCenterQuery");
jest.mock('../../../src/db/center/createCenterQuery');
describe('createCenterService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('should call createCenterQuery with correct arguments and return result', async () => {
        createCenterQuery_1.createCenterQuery.mockResolvedValue({ success: true });
        const props = {
            name: 'Center 1',
            address: '123 Main St',
            phone: '555-1234',
        };
        const result = await (0, createCenter_1.createCenterService)(props);
        expect(createCenterQuery_1.createCenterQuery).toHaveBeenCalledWith({
            name: 'Center 1',
            address: '123 Main St',
            phone: '555-1234',
        });
        expect(result).toEqual({ success: true });
    });
    it('should handle missing fields gracefully', async () => {
        createCenterQuery_1.createCenterQuery.mockResolvedValue({ success: true });
        const result = await (0, createCenter_1.createCenterService)({});
        expect(createCenterQuery_1.createCenterQuery).toHaveBeenCalledWith({ name: undefined, address: undefined, phone: undefined });
        expect(result).toEqual({ success: true });
    });
});
