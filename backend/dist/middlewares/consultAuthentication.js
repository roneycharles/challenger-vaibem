"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = require("jsonwebtoken");
var authentication_1 = __importDefault(require("../configuration/authentication"));
var AppError_1 = __importDefault(require("../errors/AppError"));
function constultAuthentication(request, response, next) {
    var authHeader = request.headers.authorization;
    if (!authHeader) {
        throw new AppError_1.default('Token JWT é necessário', 401);
    }
    var _a = authHeader.split(" "), token = _a[1];
    try {
        var decode = jsonwebtoken_1.verify(token, authentication_1.default.jwt.secret);
        var sub = decode.sub;
        request.user = {
            id: sub,
        };
        return next();
    }
    catch (err) {
        throw new AppError_1.default('Token JWT inválido', 401);
    }
}
exports.default = constultAuthentication;
