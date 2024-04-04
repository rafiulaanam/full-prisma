import { Request } from 'express';
import bcrypt from 'bcrypt';
import prisma from '../../shared/prisma';


const createUserIntoDB = async (req: Request) => {
    try {
        // const file = req.file as IFile; // Assuming IFile type is defined elsewhere

        // Handle file upload logic if needed
        // const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
        // req.body.admin.profilePhoto = uploadToCloudinary?.secure_url;

        const hashedPassword: string = await bcrypt.hash(req.body.password, 12);

        const userData = {
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            // role: UserRole.ADMIN // Assuming UserRole is defined elsewhere
        };

        const result = await prisma.user.create({
            data: userData
        });

        return result;
    } catch (error) {
        throw new Error('Failed to create admin: ' + error);
    }
};
const getUserProfile = async (req: Request & {user?:any}) => {
    // Retrieve user information from the request
    const { id, name, email, createdAt, updatedAt } = await req.user;
    console.log("🚀 ~ getUserProfile ~ req.user:", req.user)
return {
    id,
    name,
    email,
    createdAt,
    updatedAt
};

    // Send response with user information
    
};
const updateUserProfile = async (req: Request&{user ? :any}) => {
    const { id } = req.user;
    const updateData = req.body;

    try {
        // Ensure petId is provided
        if (!id) {
            throw new Error('User ID is required');
        }

        // Retrieve the pet from the database
        const pet = await prisma.user.findUnique({
            where: {
                id: id,
            },
        });

        // Ensure pet exists
        if (!pet) {
            throw new Error('User  not found');
        }

        // Update the pet's data
        const updatedUser = await prisma.user.update({
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
    } catch (error) {
        throw new Error('Failed to update pet profile: ' + error);
    }
};

export const userService={

    createUserIntoDB,
    getUserProfile,
    updateUserProfile
} 
