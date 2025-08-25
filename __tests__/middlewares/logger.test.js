"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../../src/middlewares/logger");
const node_mocks_http_1 = __importDefault(require("node-mocks-http"));
describe('loggerMiddleware', () => {
    it('should call next and log the request', () => {
        const req = node_mocks_http_1.default.createRequest({ method: 'GET', originalUrl: '/test' });
        const res = node_mocks_http_1.default.createResponse();
        const next = jest.fn();
        console.log = jest.fn();
        (0, logger_1.loggerMiddleware)(req, res, next);
        expect(next).toHaveBeenCalled();
        expect(console.log).toHaveBeenCalled();
    });
});
