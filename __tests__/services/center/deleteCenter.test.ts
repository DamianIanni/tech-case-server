import { deleteCenterService } from '../../../src/services/center/deleteCenter';
import { deleteCenterQuery } from '../../../src/db/center/deleteCenterQuery';

jest.mock('../../../src/db/center/deleteCenterQuery');

describe('deleteCenterService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call deleteCenterQuery with the centerId and return result', async () => {
    (deleteCenterQuery as jest.Mock).mockResolvedValue({ success: true });
    const result = await deleteCenterService('center123');
    expect(deleteCenterQuery).toHaveBeenCalledWith('center123');
    expect(result).toEqual({ success: true });
  });
});
