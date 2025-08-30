"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const deleteCenter_1 = require("../../../src/services/center/deleteCenter");
const deleteCenterQuery_1 = require("../../../src/db/center/deleteCenterQuery");
const database_1 = require("../../../src/config/database");
const getPatients_1 = require("../../../src/db/patient/getPatients");
const deletePatientsMassive_1 = require("../../../src/services/helpers/deletePatientsMassive");
const testUtils_1 = require("../../testUtils");

jest.mock('../../../src/db/center/deleteCenterQuery');
jest.mock('../../../src/config/database');
jest.mock('../../../src/db/patient/getPatients');
jest.mock('../../../src/services/helpers/deletePatientsMassive');
describe('deleteCenterService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('should call deleteCenterQuery with the centerId and return result', async () => {
        // Mock client connection
        const mockClient = {
            query: jest.fn().mockImplementation((query) => {
                if (query === 'BEGIN' || query === 'COMMIT' || query === 'ROLLBACK') {
                    return Promise.resolve();
                }
                return Promise.resolve({ rows: [], rowCount: 0 });
            }),
            release: jest.fn(),
        };
        database_1.dbpool.connect.mockResolvedValue(mockClient);
        
        // Mock database queries
        testUtils_1.mockFunction(getPatients_1, 'getAllPatientsInPatientCenter', []);
        testUtils_1.mockFunction(deleteCenterQuery_1, 'deleteCenterQuery', { success: true });
        testUtils_1.mockFunction(deletePatientsMassive_1, 'deletePatientsMassive', {});
        
        await (0, deleteCenter_1.deleteCenterService)('center123');
        
        expect(getPatients_1.getAllPatientsInPatientCenter).toHaveBeenCalledWith('center123', mockClient);
        expect(deleteCenterQuery_1.deleteCenterQuery).toHaveBeenCalledWith('center123', mockClient);
        expect(mockClient.query).toHaveBeenCalledWith('BEGIN');
        expect(mockClient.query).toHaveBeenCalledWith('COMMIT');
        expect(mockClient.release).toHaveBeenCalled();
    });
});
