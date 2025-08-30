"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createPatient_1 = require("../../../src/services/patient/createPatient");
const createPatient_2 = require("../../../src/db/patient/createPatient");
const database_1 = require("../../../src/config/database");

jest.mock('../../../src/db/patient/createPatient');
jest.mock('../../../src/config/database');
describe('createPatientService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('should create patient, add to center, and return patient', async () => {
        // Mock client connection
        const mockClient = {
            query: jest.fn().mockImplementation((query) => {
                if (query === 'BEGIN' || query === 'COMMIT' || query === 'ROLLBACK') {
                    return Promise.resolve();
                }
                if (query.includes('SELECT 1 FROM patients')) {
                    return Promise.resolve({ rowCount: 0 });
                }
                return Promise.resolve({ rows: [], rowCount: 0 });
            }),
            release: jest.fn(),
        };
        database_1.dbpool.connect.mockResolvedValue(mockClient);
        
        // Mock database queries
        jest.spyOn(createPatient_2, 'createPatientQuery').mockResolvedValue({ id: 'p1', name: 'Pat' });
        jest.spyOn(createPatient_2, 'createPatientInCenterQuery').mockResolvedValue({});
        
        const patientData = {
            first_name: 'Pat',
            last_name: 'Smith',
            email: 'pat@example.com',
            phone: '555-0000',
            date_of_birth: '2000-01-01T00:00:00.000Z',
        };
        const centerId = '1';
        const result = await (0, createPatient_1.createPatientService)(patientData, centerId);
        
        expect(createPatient_2.createPatientQuery).toHaveBeenCalledWith(mockClient, patientData);
        expect(createPatient_2.createPatientInCenterQuery).toHaveBeenCalledWith(mockClient, 'p1', centerId);
        expect(result).toEqual({ patientId: 'p1' });
    });
});
