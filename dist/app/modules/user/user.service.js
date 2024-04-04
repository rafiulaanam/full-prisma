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
exports.userService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = __importDefault(require("../../shared/prisma"));
const createUserIntoDB = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const file = req.file as IFile; // Assuming IFile type is defined elsewhere
        // Handle file upload logic if needed
        // const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
        // req.body.admin.profilePhoto = uploadToCloudinary?.secure_url;
        const hashedPassword = yield bcrypt_1.default.hash(req.body.password, 12);
        const userData = {
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            // role: UserRole.ADMIN // Assuming UserRole is defined elsewhere
        };
        const result = yield prisma_1.default.user.create({
            data: userData
        });
        return result;
    }
    catch (error) {
        throw new Error('Failed to create admin: ' + error);
    }
});
const getUserProfile = (req) => __awaiter(void 0, void 0, void 0, function* () {
    // Retrieve user information from the request
    const { id, name, email, createdAt, updatedAt } = yield req.user;
    console.log("🚀 ~ getUserProfile ~ req.user:", req.user);
    return {
        id,
        name,
        email,
        createdAt,
        updatedAt
    };
    // Send response with user information
});
const updateUserProfile = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    const updateData = req.body;
    try {
        // Ensure petId is provided
        if (!id) {
            throw new Error('User ID is required');
        }
        // Retrieve the pet from the database
        const pet = yield prisma_1.default.user.findUnique({
            where: {
                id: id,
            },
        });
        // Ensure pet exists
        if (!pet) {
            throw new Error('User  not found');
        }
        // Update the pet's data
        const updatedUser = yield prisma_1.default.user.update({
            where: {
                id: id,
            },
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
                updatedAt: true
            },
            data: updateData,
        });
        return updatedUser;
    }
    catch (error) {
        throw new Error('Failed to update pet profile: ' + error);
    }
});
exports.userService = {
    createUserIntoDB,
    getUserProfile,
    updateUserProfile
};
