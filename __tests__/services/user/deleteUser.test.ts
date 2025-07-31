import { deleteUserService } from '../../../src/services/user/deleteUser';
import { deleteUserQuery } from '../../../src/db/users/deleteUserQuery';

jest.mock('../../../src/db/users/deleteUserQuery');

describe('deleteUserService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call deleteUserQuery with user_id', async () => {
    (deleteUserQuery as jest.Mock).mockResolvedValue({ success: true });
    await deleteUserService('u1');
    expect(deleteUserQuery).toHaveBeenCalledWith('u1');
  });
});
