"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./auth.controller");
// import auth from '../../middlewares/auth';
// import { UserRole } from '@prisma/client';
const router = express_1.default.Router();
router.post('/login', auth_controller_1.AuthController.loginUser);
router.post('/refresh-token', auth_controller_1.AuthController.refreshToken);
// router.post(
//     '/change-password',
//     auth(
//         UserRole.SUPER_ADMIN,
//         UserRole.ADMIN,
//         UserRole.DOCTOR,
//         UserRole.PATIENT
//     ),
//     AuthController.changePassword
// );
router.post('/forgot-password', auth_controller_1.AuthController.forgotPassword);
router.post('/reset-password', auth_controller_1.AuthController.resetPassword);
exports.AuthRoutes = router;
