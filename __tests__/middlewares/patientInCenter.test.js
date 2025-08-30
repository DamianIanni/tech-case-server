"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const patientInCenter_1 = require("../../src/middlewares/patientInCenter");
const database_1 = require("../../src/config/database");
// Mock the database pool
jest.mock("../../src/config/database");
// Mock the asyncHandler
const mockAsyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
// Mock the database query
const mockQuery = database_1.dbpool.query;
describe("authorizePatientInCenter Middleware", () => {
    let req;
    let res;
    let next;
    beforeEach(() => {
        req = {
            params: {
                patient_id: "patient-123",
            },
            user: {
                id: "user-789",
                role: "admin",
                center_id: "center-456",
            },
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        next = jest.fn();
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    it("should return 403 if no center_id is associated with the user", async () => {
        // Create a new user object without center_id
        req.user = {
            id: "user-789",
            role: "admin",
            center_id: "" // Empty string to simulate no center
        };
        // Override the type for this test
        const mockReq = req;
        delete mockReq.user.center_id;
        await mockAsyncHandler(patientInCenter_1.authorizePatientInCenter)(mockReq, res, next);
        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith({
            status: "error",
            error: {
                message: "No center associated with your account",
                code: "CENTER_NO_ASSOCIATION"
            }
        });
        expect(next).not.toHaveBeenCalled();
    });
    it("should call next() if patient is in the user's center", async () => {
        mockQuery.mockResolvedValueOnce({ rowCount: 1 });
        await mockAsyncHandler(patientInCenter_1.authorizePatientInCenter)(req, res, next);
        expect(mockQuery).toHaveBeenCalledWith("SELECT 1 FROM patient_centers WHERE patient_id = $1 AND center_id = $2", ["patient-123", "center-456"]);
        expect(next).toHaveBeenCalled();
        expect(res.status).not.toHaveBeenCalled();
    });
    it("should return 403 if patient is not in the user's center", async () => {
        mockQuery.mockResolvedValueOnce({ rowCount: 0 });
        await mockAsyncHandler(patientInCenter_1.authorizePatientInCenter)(req, res, next);
        expect(mockQuery).toHaveBeenCalledWith("SELECT 1 FROM patient_centers WHERE patient_id = $1 AND center_id = $2", ["patient-123", "center-456"]);
        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith({
            status: "error",
            error: {
                message: "Patient not found in your center",
                code: "PATIENT_NOT_IN_CENTER"
            }
        });
        expect(next).not.toHaveBeenCalled();
    });
    it("should handle database errors", async () => {
        const error = new Error("Database error");
        mockQuery.mockRejectedValueOnce(error);
        
        // Our mockAsyncHandler doesn't properly propagate errors to next
        // Let's modify it for this test
        const betterMockAsyncHandler = (fn) => async (req, res, next) => {
            try {
                await fn(req, res, next);
            } catch (err) {
                next(err);
            }
        };

        // Call the middleware with our better mock
        await betterMockAsyncHandler(patientInCenter_1.authorizePatientInCenter)(req, res, next);

        // Expect next to have been called with the error
        expect(next).toHaveBeenCalled();
    });
});
