import { updatePatientService } from '../../../src/services/patient/updatePatient';
import { updatePatientQuery } from '../../../src/db/patient/updatePatient';

jest.mock('../../../src/db/patient/updatePatient');

describe('updatePatientService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call updatePatientQuery with patientId and updateData and return updated patient', async () => {
    (updatePatientQuery as jest.Mock).mockResolvedValue({ id: 'p1', name: 'Pat', updated: true });
    const updateData = { name: 'Pat', phone: '555-1111' };
    const result = await updatePatientService('p1', updateData);
    expect(updatePatientQuery).toHaveBeenCalledWith('p1', updateData);
    expect(result).toEqual({ id: 'p1', name: 'Pat', updated: true });
  });
});
