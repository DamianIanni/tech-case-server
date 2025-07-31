import { authorizePatientInCenter } from '../../src/middlewares/patientInCenter';
import httpMocks from 'node-mocks-http';

jest.mock('../../src/config/database', () => ({
  dbpool: { query: jest.fn() }
}));
const { dbpool } = require('../../src/config/database');

describe('authorizePatientInCenter', () => {
  it('should call next if patient exists in center', async () => {
    dbpool.query.mockResolvedValueOnce({ rowCount: 1 });
    const req = httpMocks.createRequest({ params: { center_id: 1, patient_id: 1 } });
    const res = httpMocks.createResponse();
    const next = jest.fn();
    await authorizePatientInCenter(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  it('should return 404 if patient not found', async () => {
    dbpool.query.mockResolvedValueOnce({ rowCount: 0 });
    const req = httpMocks.createRequest({ params: { center_id: 1, patient_id: 2 } });
    const res = httpMocks.createResponse();
    const next = jest.fn();
    await authorizePatientInCenter(req, res, next);
    expect(res.statusCode).toBe(404);
    expect(res._getJSONData()).toMatchObject({ message: 'Patient not found in this center' });
    expect(next).not.toHaveBeenCalled();
  });
});
