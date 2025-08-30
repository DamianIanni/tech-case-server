"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const deletePatient_1 = require("../../../src/services/patient/deletePatient");
const deletePatient_2 = require("../../../src/db/patient/deletePatient");
const database_1 = require("../../../src/config/database");
const testUtils_1 = require("../../testUtils");

jest.mock('../../../src/db/patient/deletePatient');
jest.mock('../../../src/config/database');
describe('deletePatientService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should call deletePatientQuery with patientId and return the result', async () => {
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
        
        // Mock database query
        testUtils_1.mockFunction(deletePatient_2, 'deletePatientQuery', { success: true });
        
        const patientId = 'p1';
        await (0, deletePatient_1.deletePatientService)(patientId);
        
        expect(deletePatient_2.deletePatientQuery).toHaveBeenCalledWith(mockClient, patientId);
        expect(mockClient.query).toHaveBeenCalledWith('BEGIN');
        expect(mockClient.query).toHaveBeenCalledWith('COMMIT');
        expect(mockClient.release).toHaveBeenCalled();
    });
});
