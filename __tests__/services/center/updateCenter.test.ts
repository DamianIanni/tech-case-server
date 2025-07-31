import { updateCenterService } from '../../../src/services/center/updateCenter';
import { updateCenterQuery } from '../../../src/db/center/updateCenterQuery';

jest.mock('../../../src/db/center/updateCenterQuery');

describe('updateCenterService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call updateCenterQuery with merged values and return updated center', async () => {
    (updateCenterQuery as jest.Mock).mockResolvedValue({ id: 'c1', name: 'Updated Center' });
    const result = await updateCenterService('c1', { name: 'Updated Center' });
    expect(updateCenterQuery).toHaveBeenCalledWith({ id: 'c1', name: 'Updated Center' });
    expect(result).toEqual({ id: 'c1', name: 'Updated Center' });
  });

  it('should handle empty updateData', async () => {
    (updateCenterQuery as jest.Mock).mockResolvedValue({ id: 'c2' });
    const result = await updateCenterService('c2', {});
    expect(updateCenterQuery).toHaveBeenCalledWith({ id: 'c2' });
    expect(result).toEqual({ id: 'c2' });
  });
});
