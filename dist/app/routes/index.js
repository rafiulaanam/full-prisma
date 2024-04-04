"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_routes_1 = require("../modules/user/user.routes");
const auth_routes_1 = require("../modules/auth/auth.routes");
const pet_routes_1 = require("../modules/pet/pet.routes");
const adoptionRequest_routes_1 = require("../modules/adoptionRequest/adoptionRequest.routes");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/',
        route: user_routes_1.userRoutes
    },
    {
        path: '/',
        route: auth_routes_1.AuthRoutes
    },
    {
        path: '/',
        route: pet_routes_1.petRoutes
    },
    {
        path: '/',
        route: adoptionRequest_routes_1.adoptionRequestRoutes
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
