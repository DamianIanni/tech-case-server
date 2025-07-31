import { findUserByEmail } from '../../../src/services/helpers/findUserByEmail';
import { findUserByEmailQuery } from '../../../src/db/helpers/findUserByEmailQuery';

jest.mock('../../../src/db/helpers/findUserByEmailQuery');

describe('findUserByEmail', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call findUserByEmailQuery with email and true, and return result', async () => {
    (findUserByEmailQuery as jest.Mock).mockResolvedValue({ rows: [{ id: 1, email: 'a@b.com' }] });
    const result = await findUserByEmail('a@b.com');
    expect(findUserByEmailQuery).toHaveBeenCalledWith('a@b.com', true);
    expect(result).toEqual({ rows: [{ id: 1, email: 'a@b.com' }] });
  });
});
