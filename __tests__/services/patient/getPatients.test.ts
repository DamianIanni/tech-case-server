import { getPatientService, getAllPatientsService } from '../../../src/services/patient/getPatients';
import { getPatientQuery, getAllPatientsQuery } from '../../../src/db/patient/getPatients';

jest.mock('../../../src/db/patient/getPatients');

describe('getPatientService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call getPatientQuery with patientId and centerId and return patient', async () => {
    (getPatientQuery as jest.Mock).mockResolvedValue({ id: 'p1', name: 'Pat' });
    const result = await getPatientService('p1', 'center1');
    expect(getPatientQuery).toHaveBeenCalledWith('p1', 'center1');
    expect(result).toEqual({ id: 'p1', name: 'Pat' });
  });
});

describe('getAllPatientsService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call getAllPatientsQuery with centerId and return patients', async () => {
    (getAllPatientsQuery as jest.Mock).mockResolvedValue([
      { id: 'p1', name: 'Pat' },
      { id: 'p2', name: 'Alex' },
    ]);
    const result = await getAllPatientsService('center1');
    expect(getAllPatientsQuery).toHaveBeenCalledWith('center1');
    expect(result).toEqual([
      { id: 'p1', name: 'Pat' },
      { id: 'p2', name: 'Alex' },
    ]);
  });
});
