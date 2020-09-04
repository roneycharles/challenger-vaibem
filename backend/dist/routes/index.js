"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var user_routes_1 = __importDefault(require("./user.routes"));
var task_routes_1 = __importDefault(require("./task.routes"));
var session_routes_1 = __importDefault(require("./session.routes"));
var routes = express_1.Router();
routes.use('/users', user_routes_1.default);
routes.use('/tasks', task_routes_1.default);
routes.use('/sessions', session_routes_1.default);
exports.default = routes;
