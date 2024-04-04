"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.petRoutes = void 0;
const express_1 = __importDefault(require("express"));
const pet_controller_1 = require("./pet.controller");
const auth_1 = require("../../middlewares/auth");
const router = express_1.default.Router();
router.post('/pets', pet_controller_1.petController.createPet);
router.get('/pets', pet_controller_1.petController.getPaginatedFilteredPets);
router.put('/pets/:petId', auth_1.authMiddleware, pet_controller_1.petController.updatePetProfile);
exports.petRoutes = router;
