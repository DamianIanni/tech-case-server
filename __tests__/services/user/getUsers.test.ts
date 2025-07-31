import { getAllUsersService, getUserByIdService } from '../../../src/services/user/getUsers';
import { getAllUsersQuery, getUserByIdQuery } from '../../../src/db/users/getAllUsersQuery';

jest.mock('../../../src/db/users/getAllUsersQuery');

describe('getAllUsersService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call getAllUsersQuery with center_id and return result', async () => {
    (getAllUsersQuery as jest.Mock).mockResolvedValue([{ id: 'u1', name: 'User1' }]);
    const result = await getAllUsersService('center1');
    expect(getAllUsersQuery).toHaveBeenCalledWith('center1');
    expect(result).toEqual([{ id: 'u1', name: 'User1' }]);
  });
});

describe('getUserByIdService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call getUserByIdQuery with user_id and return result', async () => {
    (getUserByIdQuery as jest.Mock).mockResolvedValue({ id: 'u1', name: 'User1' });
    const result = await getUserByIdService('u1');
    expect(getUserByIdQuery).toHaveBeenCalledWith('u1');
    expect(result).toEqual({ id: 'u1', name: 'User1' });
  });
});
