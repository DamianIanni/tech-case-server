import { deleteCenterService } from '../../../src/services/center/deleteCenter';
import { deleteCenterQuery } from '../../../src/db/center/deleteCenterQuery';
import { dbpool } from '../../../src/config/database';
import { getAllPatientsInPatientCenter } from '../../../src/db/patient/getPatients';
import { deletePatientsMassive } from '../../../src/services/helpers/deletePatientsMassive';

jest.mock('../../../src/db/center/deleteCenterQuery');
jest.mock('../../../src/config/database');
jest.mock('../../../src/db/patient/getPatients');
jest.mock('../../../src/services/helpers/deletePatientsMassive');

describe('deleteCenterService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call deleteCenterQuery with the centerId and return result', async () => {
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
    
    // Mock database queries
    (getAllPatientsInPatientCenter as jest.Mock).mockResolvedValue([]);
    (deleteCenterQuery as jest.Mock).mockResolvedValue({ success: true });
    (deletePatientsMassive as jest.Mock).mockResolvedValue({});
    
    await deleteCenterService('center123');
    
    expect(getAllPatientsInPatientCenter).toHaveBeenCalledWith('center123', mockClient);
    expect(deleteCenterQuery).toHaveBeenCalledWith('center123', mockClient);
    expect(mockClient.query).toHaveBeenCalledWith('BEGIN');
    expect(mockClient.query).toHaveBeenCalledWith('COMMIT');
    expect(mockClient.release).toHaveBeenCalled();
  });
});
