"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getPatients_1 = require("../../../src/services/patient/getPatients");
const getPatients_2 = require("../../../src/db/patient/getPatients");
jest.mock('../../../src/db/patient/getPatients');
describe('getPatientService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should call getPatientQuery with patientId and centerId and return patient', async () => {
        getPatients_2.getPatientQuery.mockResolvedValue({ id: 'p1', name: 'Pat' });
        const result = await (0, getPatients_1.getPatientService)('p1', 'center1');
        expect(getPatients_2.getPatientQuery).toHaveBeenCalledWith('p1', 'center1');
        expect(result).toEqual({ id: 'p1', name: 'Pat' });
    });
});
describe('getAllPatientsService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should call getAllPatientsQuery with centerId and return patients', async () => {
        getPatients_2.getAllPatientsQuery.mockResolvedValue([
            { id: 'p1', name: 'Pat' },
            { id: 'p2', name: 'Alex' },
        ]);
        const result = await (0, getPatients_1.getAllPatientsService)('center1');
        expect(getPatients_2.getAllPatientsQuery).toHaveBeenCalledWith('center1');
        expect(result).toEqual([
            { id: 'p1', name: 'Pat' },
            { id: 'p2', name: 'Alex' },
        ]);
    });
});
