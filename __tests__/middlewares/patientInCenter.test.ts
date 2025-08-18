import { Request, Response, NextFunction } from "express";
import { authorizePatientInCenter } from "../../src/middlewares/patientInCenter";
import { dbpool } from "../../src/config/database";

// Mock the database pool
jest.mock("../../src/config/database");

// Mock the asyncHandler
const mockAsyncHandler = (fn: any) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

// Mock the database query
const mockQuery = dbpool.query as jest.Mock;

describe("authorizePatientInCenter Middleware", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: jest.Mock;

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
    const mockReq = req as any;
    delete mockReq.user.center_id;

    await mockAsyncHandler(authorizePatientInCenter) (
      mockReq as Request,
      res as Response,
      next
    );

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      message: "No center associated with your account",
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("should call next() if patient is in the user's center", async () => {
    mockQuery.mockResolvedValueOnce({ rowCount: 1 });

    await mockAsyncHandler(authorizePatientInCenter) (
      req as Request,
      res as Response,
      next
    );

    expect(mockQuery).toHaveBeenCalledWith(
      "SELECT 1 FROM patient_centers WHERE patient_id = $1 AND center_id = $2",
      ["patient-123", "center-456"]
    );
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });

  it("should return 403 if patient is not in the user's center", async () => {
    mockQuery.mockResolvedValueOnce({ rowCount: 0 });

    await mockAsyncHandler(authorizePatientInCenter) (
      req as Request,
      res as Response,
      next
    );

    expect(mockQuery).toHaveBeenCalledWith(
      "SELECT 1 FROM patient_centers WHERE patient_id = $1 AND center_id = $2",
      ["patient-123", "center-456"]
    );
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      message: "Patient not found in your center",
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("should handle database errors", async () => {
    const error = new Error("Database error");
    mockQuery.mockRejectedValueOnce(error);

    await expect(
      mockAsyncHandler(authorizePatientInCenter) (
        req as Request,
        res as Response,
        next
      )
    ).rejects.toThrow(error);
  });
});
