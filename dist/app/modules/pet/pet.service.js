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
const getPaginatedFilteredPets = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extracting query parameters
        const { species, breed, age, size, location, searchTerm, page, limit, sortBy, sortOrder } = req.query;
        // Ensuring page and limit are strings
        const pageNumber = page || '1';
        const limitNumber = limit || '10';
        // Building filter object based on query parameters
        const filter = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, (species && { species: { contains: species.toString() } })), (breed && { breed: { contains: breed.toString() } })), (age && { age: parseInt(age.toString()) })), (size && { size: size.toString() })), (location && { location: { contains: location.toString() } })), { OR: searchTerm
                ? [
                    { species: { contains: searchTerm.toString() } },
                    { breed: { contains: searchTerm.toString() } },
                    { location: { contains: searchTerm.toString() } },
                    // Add other searchable fields here
                ]
                : undefined });
        // Sorting options
        const orderBy = sortBy ? {
            [sortBy.toString()]: sortOrder === 'desc' ? 'desc' : 'asc',
        } : undefined;
        // Fetch pets from database based on filters
        const pets = yield prisma_1.default.pet.findMany({
            where: filter,
            orderBy,
            skip: (parseInt(pageNumber) - 1) * parseInt(limitNumber),
            take: parseInt(limitNumber),
        });
        // Fetch total count of pets for pagination meta
        const totalPetsCount = yield prisma_1.default.pet.count({ where: filter });
        return {
            meta: {
                page: parseInt(pageNumber),
                limit: parseInt(limitNumber),
                total: totalPetsCount
            },
            data: pets
        };
    }
    catch (error) {
        throw new Error('Failed to fetch pets: ' + error);
    }
});
const updatePetProfile = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { petId } = req.params;
    const updateData = req.body;
    try {
        // Ensure petId is provided
        if (!petId) {
            throw new Error('Pet ID is required');
        }
        // Retrieve the pet from the database
        const pet = yield prisma_1.default.pet.findUnique({
            where: {
                id: petId,
            },
        });
        // Ensure pet exists
        if (!pet) {
            throw new Error('Pet not found');
        }
        // Update the pet's data
        const updatedPet = yield prisma_1.default.pet.update({
            where: {
                id: petId,
            },
            data: updateData,
        });
        return updatedPet;
    }
    catch (error) {
        throw new Error('Failed to update pet profile: ' + error);
    }
});
exports.petService = {
    addPetIntoDB,
    getPaginatedFilteredPets,
    updatePetProfile
};
