import { errorHandlerMiddleware } from "../../src/handler/errorHandler";
import httpMocks from "node-mocks-http";

describe("errorHandlerMiddleware", () => {
  it("should return error response with status and message", () => {
    const err = {
      name: "AppError",
      message: "Test error",
      statusCode: 400,
      stack: "",
    };
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();
    const next = jest.fn();
    errorHandlerMiddleware(err, req, res, next);
    expect(res.statusCode).toBe(400);
    expect(res._getJSONData()).toMatchObject({
      status: "error",
      statusCode: 400,
      message: "Test error",
    });
  });
});
