"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getCenters_1 = require("../../../src/services/center/getCenters");
const getCenters_2 = require("../../../src/db/center/getCenters");
jest.mock('../../../src/db/center/getCenters');
describe('getAllCentersService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('should call getAllCentersQuery with userId and return centers', async () => {
        getCenters_2.getAllCentersQuery.mockResolvedValue([{ id: 1, name: 'C1' }]);
        const result = await (0, getCenters_1.getAllCentersService)('user123');
        expect(getCenters_2.getAllCentersQuery).toHaveBeenCalledWith('user123');
        expect(result).toEqual([{ id: 1, name: 'C1' }]);
    });
});
describe('getCenterService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('should call getCenterQuery with centerId and userId and return center', async () => {
        getCenters_2.getCenterQuery.mockResolvedValue({ id: 1, name: 'C1' });
        const result = await (0, getCenters_1.getCenterService)('center1', 'user123');
        expect(getCenters_2.getCenterQuery).toHaveBeenCalledWith('center1', 'user123');
        expect(result).toEqual({ id: 1, name: 'C1' });
    });
});
