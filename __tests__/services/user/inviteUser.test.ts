import { addInvitedUserService } from '../../../src/services/user/inviteUser';
import { addInvitedUserToCenterQuery } from '../../../src/db/users/addInvitedUserToCenterQuery';

jest.mock('../../../src/db/users/addInvitedUserToCenterQuery');

describe('addInvitedUserService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call addInvitedUserToCenterQuery with props and return result', async () => {
    (addInvitedUserToCenterQuery as jest.Mock).mockResolvedValue({ id: 'u2', invited: true });
    const props = { email: 'invite@example.com', center_id: 'center1', role: 'admin' as const, user_id: 'u2', status: 'pending' as const };
    const result = await addInvitedUserService(props);
    expect(addInvitedUserToCenterQuery).toHaveBeenCalledWith(props);
    expect(result).toEqual({ id: 'u2', invited: true });
  });
});
