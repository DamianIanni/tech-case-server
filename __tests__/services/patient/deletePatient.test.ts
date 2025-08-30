import { deletePatientService } from '../../../src/services/patient/deletePatient';
import { deletePatientQuery } from '../../../src/db/patient/deletePatient';
import { dbpool } from '../../../src/config/database';

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
    (dbpool.connect as jest.Mock).mockResolvedValue(mockClient);
    
    // Mock database query
    (deletePatientQuery as jest.Mock).mockResolvedValue({ success: true });
    
    const patientId = 'p1';
    await deletePatientService(patientId);
    
    expect(deletePatientQuery).toHaveBeenCalledWith(mockClient, patientId);
    expect(mockClient.query).toHaveBeenCalledWith('BEGIN');
    expect(mockClient.query).toHaveBeenCalledWith('COMMIT');
    expect(mockClient.release).toHaveBeenCalled();
  });
});
