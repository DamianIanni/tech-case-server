import { authorizeActionInCenterOverPatient } from '../../src/middlewares/authActionCenterOverPatient';
import httpMocks from 'node-mocks-http';

jest.mock('../../src/config/database', () => ({
  dbpool: { query: jest.fn() }
}));
const { dbpool } = require('../../src/config/database');

describe('authorizeActionInCenterOverPatient', () => {
  it('should call next if user is authorized and patient exists', async () => {
    dbpool.query.mockResolvedValueOnce({ rowCount: 1, rows: [{ role: 'admin', patient_id: 1 }] });
    const req = httpMocks.createRequest({ params: { centerId: 1, patientId: 1 }, user: { id: 1 } });
    const res = httpMocks.createResponse();
    const next = jest.fn();
    await authorizeActionInCenterOverPatient(req, res, next);
    expect(next).toHaveBeenCalled();
    expect(req.auth).toEqual({ role: 'admin', centerId: 1 });
  });

  it('should return 403 if unauthorized or center not found', async () => {
    dbpool.query.mockResolvedValueOnce({ rowCount: 0 });
    const req = httpMocks.createRequest({ params: { centerId: 1, patientId: 1 }, user: { id: 1 } });
    const res = httpMocks.createResponse();
    const next = jest.fn();
    await authorizeActionInCenterOverPatient(req, res, next);
    expect(res.statusCode).toBe(403);
    expect(res._getJSONData()).toMatchObject({ message: 'Unauthorized or center not found' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 404 if patient not found in center', async () => {
    dbpool.query.mockResolvedValueOnce({ rowCount: 1, rows: [{ role: 'admin', patient_id: null }] });
    const req = httpMocks.createRequest({ params: { centerId: 1, patientId: 1 }, user: { id: 1 } });
    const res = httpMocks.createResponse();
    const next = jest.fn();
    await authorizeActionInCenterOverPatient(req, res, next);
    expect(res.statusCode).toBe(404);
    expect(res._getJSONData()).toMatchObject({ message: 'Patient not found in this center' });
    expect(next).not.toHaveBeenCalled();
  });
});
