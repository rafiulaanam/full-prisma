import  jwt, { Secret }  from 'jsonwebtoken';

import { Request } from 'express';
import prisma from '../../shared/prisma';
import { Prisma } from '@prisma/client';
import config from '../../../config';


const addPetIntoDB = async (req:Request) => {
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
        const result = await prisma.pet.create({
            data: petData
        });

       

        return result
    } catch (error) {
        throw new Error('Failed to add pet: ' + error);
    }
};



const getAdoptionRequests = async () => {
    // Retrieve adoption requests from the database
    const adoptionRequests = await prisma.adoptionRequest.findMany();

 return adoptionRequests
};


const updatePetProfile = async (req: Request) => {
    const { requestId } = req.params;
    const updateData = req.body;

    try {
        // Ensure petId is provided
        if (!requestId) {
            throw new Error('Pet ID is required');
        }

        // Retrieve the pet from the database
        const pet = await prisma.adoptionRequest.findUnique({
            where: {
                id: requestId,
            },
        });

        // Ensure pet exists
        if (!pet) {
            throw new Error('Pet adap not found');
        }

        // Update the pet's data
        const updatedPet = await prisma.adoptionRequest.update({
            where: {
                id: requestId,
            },
            data: updateData,
        });

        return updatedPet;
    } catch (error) {
        throw new Error('Failed to update pet profile: ' + error);
    }
};


const submitAdoptionRequest = async (req:Request) => {
    const { petId, petOwnershipExperience , userId} = req.body;

    // Ensure petId and petOwnershipExperience are provided
    if (!petId || !petOwnershipExperience) {
        throw new Error('Pet ID and pet ownership experience are required');
    }

    // Check if the pet exists
    const pet = await prisma.pet.findUnique({
        where: {
            id: petId,
        },
    });

    if (!pet) {
        throw new Error('Pet not found');
    }

    
    // Create adoption request
    const adoptionRequest = await prisma.adoptionRequest.create({
        data: {
            userId,
            petId,
            petOwnershipExperience,
        },
    });
    return adoptionRequest;
};
 


export const petService={

    addPetIntoDB,
    getAdoptionRequests,
    updatePetProfile,
    submitAdoptionRequest

} 
