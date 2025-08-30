import { createPatientService } from '../../../src/services/patient/createPatient';
import { createPatientQuery, createPatientInCenterQuery } from '../../../src/db/patient/createPatient';
import { dbpool } from '../../../src/config/database';

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
    (dbpool.connect as jest.Mock).mockResolvedValue(mockClient);
    
    // Mock database queries
    (createPatientQuery as jest.Mock).mockResolvedValue({ id: 'p1', name: 'Pat' });
    (createPatientInCenterQuery as jest.Mock).mockResolvedValue({});

    const patientData = {
      first_name: 'Pat',
      last_name: 'Smith',
      email: 'pat@example.com',
      phone: '555-0000',
      date_of_birth: '2000-01-01T00:00:00.000Z',
    };
    const centerId = '1';
    const result = await createPatientService(patientData, centerId);

    expect(createPatientQuery).toHaveBeenCalledWith(mockClient, patientData);
    expect(createPatientInCenterQuery).toHaveBeenCalledWith(mockClient, 'p1', centerId);
    expect(result).toEqual({ patientId: 'p1' });
  });
});
