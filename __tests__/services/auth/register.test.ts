import { registerUserService } from '../../../src/services/auth/register';
import { hashPassword } from '../../../src/utils/auth/hashPassword';
import { registerUserQuery } from '../../../src/db/auth/registerUserQuery';

jest.mock('../../../src/utils/auth/hashPassword');
jest.mock('../../../src/db/auth/registerUserQuery');

describe('registerUserService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should hash the password and call registerUserQuery with hashed password', async () => {
    (hashPassword as jest.Mock).mockResolvedValue('hashedpass');
    (registerUserQuery as jest.Mock).mockResolvedValue({ success: true });

    const props = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: 'plainpass',
    };

    const result = await registerUserService(props);

    expect(hashPassword).toHaveBeenCalledWith('plainpass');
    expect(registerUserQuery).toHaveBeenCalledWith({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: 'hashedpass',
    });
    expect(result).toEqual({ success: true });
  });

  it('should throw if password is missing', async () => {
    await expect(registerUserService({
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane@example.com',
    })).rejects.toThrow();
  });
});
