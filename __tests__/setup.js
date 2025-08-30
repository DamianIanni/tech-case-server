// Set up environment variables for all tests
process.env.JWT_TEMP_SECRET = 'test-temp-secret';
process.env.JWT_RESET_SECRET = 'test-reset-secret';
process.env.JWT_SECRET = 'test-secret';
process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/test';

// Mock database pool to prevent actual database connections
jest.mock('../src/config/database', () => ({
  dbpool: {
    query: jest.fn().mockResolvedValue({ rows: [], rowCount: 0 }),
    connect: jest.fn().mockReturnValue({
      query: jest.fn().mockResolvedValue({ rows: [], rowCount: 0 }),
      release: jest.fn(),
    }),
  },
}));

// Add a dummy test to prevent the "Your test suite must contain at least one test" error
describe('Setup', () => {
  it('should set up environment variables', () => {
    expect(process.env.JWT_SECRET).toBe('test-secret');
  });
});
