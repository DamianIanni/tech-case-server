import { createPatientService } from '../../../src/services/patient/createPatient';
import { createPatientQuery, createPatientInCenterQuery } from '../../../src/db/patient/createPatient';

jest.mock('../../../src/db/patient/createPatient');

describe('createPatientService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create patient, add to center, and return patient', async () => {
    (createPatientQuery as jest.Mock).mockResolvedValue({ id: 'p1', name: 'Pat' });
    (createPatientInCenterQuery as jest.Mock).mockResolvedValue({});

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
    const result = await createPatientService(patientData, centerId);

    expect(createPatientQuery).toHaveBeenCalledWith(patientData, centerId);
    expect(createPatientInCenterQuery).toHaveBeenCalledWith('p1', centerId);
    expect(result).toEqual({ id: 'p1', name: 'Pat' });
  });
});
