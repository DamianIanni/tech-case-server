import { logoutUserService } from '../../../src/services/auth/logout';

describe('logoutUserService', () => {
  it('should return logout success message', async () => {
    const result = await logoutUserService();
    expect(result).toEqual({ message: 'Successfully logged out' });
  });
});
