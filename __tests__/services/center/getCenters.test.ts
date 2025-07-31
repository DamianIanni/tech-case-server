import { getAllCentersService, getCenterService } from '../../../src/services/center/getCenters';
import { getCenterQuery, getAllCentersQuery } from '../../../src/db/center/getCenters';

jest.mock('../../../src/db/center/getCenters');

describe('getAllCentersService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call getAllCentersQuery with userId and return centers', async () => {
    (getAllCentersQuery as jest.Mock).mockResolvedValue([{ id: 1, name: 'C1' }]);
    const result = await getAllCentersService('user123');
    expect(getAllCentersQuery).toHaveBeenCalledWith('user123');
    expect(result).toEqual([{ id: 1, name: 'C1' }]);
  });
});

describe('getCenterService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call getCenterQuery with centerId and userId and return center', async () => {
    (getCenterQuery as jest.Mock).mockResolvedValue({ id: 1, name: 'C1' });
    const result = await getCenterService('center1', 'user123');
    expect(getCenterQuery).toHaveBeenCalledWith('center1', 'user123');
    expect(result).toEqual({ id: 1, name: 'C1' });
  });
});
