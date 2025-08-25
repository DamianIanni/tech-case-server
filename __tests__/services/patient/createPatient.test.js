"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createPatient_1 = require("../../../src/services/patient/createPatient");
const createPatient_2 = require("../../../src/db/patient/createPatient");
jest.mock('../../../src/db/patient/createPatient');
describe('createPatientService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('should create patient, add to center, and return patient', async () => {
        createPatient_2.createPatientQuery.mockResolvedValue({ id: 'p1', name: 'Pat' });
        createPatient_2.createPatientInCenterQuery.mockResolvedValue({});
        const patientData = {
            id: 'p1',
            first_name: 'Pat',
            last_name: 'Smith',
            email: 'pat@example.com',
            phone: '555-0000',
            date_of_birth: new Date('2000-01-01'),
            created_at: new Date('2020-01-01'),
        };
        const centerId = '1';
        const result = await (0, createPatient_1.createPatientService)(patientData, centerId);
        expect(createPatient_2.createPatientQuery).toHaveBeenCalledWith(patientData, centerId);
        expect(createPatient_2.createPatientInCenterQuery).toHaveBeenCalledWith('p1', centerId);
        expect(result).toEqual({ id: 'p1', name: 'Pat' });
    });
});
