"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.petService = void 0;
const prisma_1 = __importDefault(require("../../shared/prisma"));
const addPetIntoDB = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extracting data from request body
        const { name, species, breed, age, size, location, description, temperament, medicalHistory, adoptionRequirements } = req.body;
        // Creating pet data object
        const petData = {
            name,
            species,
            breed,
            age,
            size,
            location,
            description,
            temperament,
            medicalHistory,
            adoptionRequirements
        };
        // Create the pet in the database
        const result = yield prisma_1.default.pet.create({
            data: petData
        });
        return result;
    }
    catch (error) {
        throw new Error('Failed to add pet: ' + error);
    }
});
const getAdoptionRequests = () => __awaiter(void 0, void 0, void 0, function* () {
    // Retrieve adoption requests from the database
    const adoptionRequests = yield prisma_1.default.adoptionRequest.findMany();
    return adoptionRequests;
});
const updatePetProfile = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { requestId } = req.params;
    const updateData = req.body;
    try {
        // Ensure petId is provided
        if (!requestId) {
            throw new Error('Pet ID is required');
        }
        // Retrieve the pet from the database
        const pet = yield prisma_1.default.adoptionRequest.findUnique({
            where: {
                id: requestId,
            },
        });
        // Ensure pet exists
        if (!pet) {
            throw new Error('Pet adap not found');
        }
        // Update the pet's data
        const updatedPet = yield prisma_1.default.adoptionRequest.update({
            where: {
                id: requestId,
            },
            data: updateData,
        });
        return updatedPet;
    }
    catch (error) {
        throw new Error('Failed to update pet profile: ' + error);
    }
});
const submitAdoptionRequest = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { petId, petOwnershipExperience, userId } = req.body;
    // Ensure petId and petOwnershipExperience are provided
    if (!petId || !petOwnershipExperience) {
        throw new Error('Pet ID and pet ownership experience are required');
    }
    // Check if the pet exists
    const pet = yield prisma_1.default.pet.findUnique({
        where: {
            id: petId,
        },
    });
    if (!pet) {
        throw new Error('Pet not found');
    }
    // Create adoption request
    const adoptionRequest = yield prisma_1.default.adoptionRequest.create({
        data: {
            userId,
            petId,
            petOwnershipExperience,
        },
    });
    return adoptionRequest;
});
exports.petService = {
    addPetIntoDB,
    getAdoptionRequests,
    updatePetProfile,
    submitAdoptionRequest
};
