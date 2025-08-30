import { createCenterService } from '../../../src/services/center/createCenter';
import { createCenterQuery } from '../../../src/db/center/createCenterQuery';

jest.mock('../../../src/db/center/createCenterQuery');

describe('createCenterService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call createCenterQuery with correct arguments and return result', async () => {
    (createCenterQuery as jest.Mock).mockResolvedValue({ success: true });

    const props = {
      name: 'Center 1',
      address: '123 Main St',
      phone: '555-1234',
    };

    const result = await createCenterService(props);

    expect(createCenterQuery).toHaveBeenCalledWith({
      name: 'Center 1',
      address: '123 Main St',
      phone: '555-1234',
    });
    expect(result).toEqual({ success: true });
  });

  it('should handle all required fields', async () => {
    (createCenterQuery as jest.Mock).mockResolvedValue({ success: true });
    const result = await createCenterService({
      name: 'Test Center',
      address: '123 Test Street',
      phone: '555-123-4567'
    });
    expect(createCenterQuery).toHaveBeenCalledWith({
      name: 'Test Center',
      address: '123 Test Street',
      phone: '555-123-4567'
    });
    expect(result).toEqual({ success: true });
  });
});
