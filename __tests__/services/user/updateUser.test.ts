import { updateUserService } from '../../../src/services/user/updateUser';
import { updateUserQuery } from '../../../src/db/users/uptadeUserquery';
import { hashPassword } from '../../../src/utils/auth/hashPassword';
import { buildDynamicUpdate } from '../../../src/utils/buildDynamicUpdate';

jest.mock('../../../src/db/users/uptadeUserquery');
jest.mock('../../../src/utils/auth/hashPassword');
jest.mock('../../../src/utils/buildDynamicUpdate');

describe('updateUserService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should update user fields and call updateUserQuery for users and user_centers', async () => {
    (hashPassword as jest.Mock).mockResolvedValue('hashed');
    (buildDynamicUpdate as jest.Mock).mockImplementation((table, data, where) => ({ query: `UPDATE ${table}`, values: Object.values(data).concat(where.value) }));
    (updateUserQuery as jest.Mock).mockResolvedValue({});

    const updateData = { first_name: 'New', last_name: 'Name', password: 'pass', role: 'admin' as const, status: 'active' as const };
    await updateUserService('center1', 'u1', updateData);

    // Users table update
    expect(buildDynamicUpdate).toHaveBeenCalledWith('users', expect.objectContaining({ first_name: 'New', last_name: 'Name', password: 'hashed' }), { column: 'id', value: 'u1' });
    expect(updateUserQuery).toHaveBeenCalledWith('UPDATE users', expect.arrayContaining(['New', 'Name', 'hashed', 'u1']));

    // User centers table update
    expect(buildDynamicUpdate).toHaveBeenCalledWith('user_centers', expect.objectContaining({ role: 'admin', status: 'active' }), { column: 'user_id', value: 'u1' });
    expect(updateUserQuery).toHaveBeenCalledWith(expect.stringContaining('UPDATE user_centers'), expect.arrayContaining(['admin', 'active', 'u1', 'center1']));
  });

  it('should not call updateUserQuery if no updateData provided', async () => {
    await updateUserService('center1', 'u1', {});
    expect(updateUserQuery).not.toHaveBeenCalled();
  });
});
