import { updateMeService } from '../../../src/services/account/updateMe';

jest.mock('../../../src/utils/auth/hashPassword', () => ({
  hashPassword: jest.fn(async (pw: string) => `hashed_${pw}`),
}));

jest.mock('../../../src/db/users/uptadeUserquery', () => ({
  updateUserQuery: jest.fn(async () => undefined),
}));

jest.mock('../../../src/utils/buildDynamicUpdate', () => ({
  buildDynamicUpdate: jest.fn((table, data, where) => ({
    query: 'UPDATE users SET ...',
    values: Object.values(data).concat(where.value),
  })),
}));

describe('updateMeService', () => {
  afterEach(() => jest.clearAllMocks());

  it('should update first_name and last_name', async () => {
    const result = await updateMeService('user123', { first_name: 'John', last_name: 'Doe' });
    expect(result).toEqual({ message: 'User updated' });
  });

  it('should update with empty data', async () => {
    const result = await updateMeService('user123', { first_name: 'John' });
    expect(result).toEqual({ message: 'User updated' });
  });

  it('should throw if no data provided', async () => {
    await expect(updateMeService('user123', {})).rejects.toThrow('No data to update');
  });
});
