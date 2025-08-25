"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler_1 = require("../../src/handler/errorHandler");
const node_mocks_http_1 = __importDefault(require("node-mocks-http"));
describe("errorHandlerMiddleware", () => {
    it("should return error response with status and message", () => {
        const err = {
            name: "AppError",
            message: "Test error",
            statusCode: 400,
            stack: "",
        };
        const req = node_mocks_http_1.default.createRequest();
        const res = node_mocks_http_1.default.createResponse();
        const next = jest.fn();
        (0, errorHandler_1.errorHandlerMiddleware)(err, req, res, next);
        expect(res.statusCode).toBe(400);
        expect(res._getJSONData()).toMatchObject({
            status: "error",
            statusCode: 400,
            message: "Test error",
        });
    });
});
