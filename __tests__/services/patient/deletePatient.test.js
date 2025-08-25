"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const deletePatient_1 = require("../../../src/services/patient/deletePatient");
const deletePatient_2 = require("../../../src/db/patient/deletePatient");
jest.mock('../../../src/db/patient/deletePatient');
describe('deletePatientService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should call deletePatientQuery with patientId and return the result', async () => {
        deletePatient_2.deletePatientQuery.mockResolvedValue({ success: true });
        const patientId = 'p1';
        const result = await (0, deletePatient_1.deletePatientService)(patientId);
        expect(deletePatient_2.deletePatientQuery).toHaveBeenCalledWith(patientId);
        expect(result).toEqual({ success: true });
    });
});
