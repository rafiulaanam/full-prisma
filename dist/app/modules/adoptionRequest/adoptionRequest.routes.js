"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adoptionRequestRoutes = void 0;
const express_1 = __importDefault(require("express"));
const adoptionRequest_controller_1 = require("./adoptionRequest.controller");
const auth_1 = require("../../middlewares/auth");
const router = express_1.default.Router();
router.post('/pets', adoptionRequest_controller_1.petController.createPet);
router.get('/pets/adoption-request', adoptionRequest_controller_1.petController.getRequestPets);
router.put('/adoption-requests/:requestId', auth_1.authMiddleware, adoptionRequest_controller_1.petController.updatePetProfile);
router.post('/pets/adoption-request', auth_1.authMiddleware, adoptionRequest_controller_1.petController.submitAdoptionRequest);
exports.adoptionRequestRoutes = router;
