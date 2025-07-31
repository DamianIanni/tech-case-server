import { deletePatientService } from '../../../src/services/patient/deletePatient';
import { deletePatientQuery } from '../../../src/db/patient/deletePatient';

jest.mock('../../../src/db/patient/deletePatient');

describe('deletePatientService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call deletePatientQuery with patientId and return the result', async () => {
    (deletePatientQuery as jest.Mock).mockResolvedValue({ success: true });
    const patientId = 'p1';
    const result = await deletePatientService(patientId);
    expect(deletePatientQuery).toHaveBeenCalledWith(patientId);
    expect(result).toEqual({ success: true });
  });
});
