"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const updatePatient_1 = require("../../../src/services/patient/updatePatient");
const updatePatient_2 = require("../../../src/db/patient/updatePatient");
const testUtils_1 = require("../../testUtils");

jest.mock('../../../src/db/patient/updatePatient');
describe('updatePatientService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should call updatePatientQuery with patientId and updateData and return updated patient', async () => {
        testUtils_1.mockFunction(updatePatient_2, 'updatePatientQuery', { id: 'p1', name: 'Pat', updated: true });
        const updateData = { name: 'Pat', phone: '555-1111' };
        const result = await (0, updatePatient_1.updatePatientService)('p1', updateData);
        expect(updatePatient_2.updatePatientQuery).toHaveBeenCalledWith('p1', updateData);
        expect(result).toEqual({ id: 'p1', name: 'Pat', updated: true });
    });
});
