

import { Request } from 'express';
import prisma from '../../shared/prisma';
import { Prisma } from '@prisma/client';


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



const getPaginatedFilteredPets = async (req: Request) => {
    try {
        // Extracting query parameters
        const { species, breed, age, size, location, searchTerm, page, limit, sortBy, sortOrder } = req.query;

        // Ensuring page and limit are strings
        const pageNumber: string = (page as string) || '1';
        const limitNumber: string = (limit as string) || '10';

        // Building filter object based on query parameters
        const filter: Prisma.PetWhereInput = {
            ...(species && { species: { contains: species.toString() } }),
            ...(breed && { breed: { contains: breed.toString() } }),
            ...(age && { age: parseInt(age.toString()) }),
            ...(size && { size: size.toString() }),
            ...(location && { location: { contains: location.toString() } }),
            OR: searchTerm
                ? [
                    { species: { contains: searchTerm.toString() } },
                    { breed: { contains: searchTerm.toString() } },
                    { location: { contains: searchTerm.toString() } },
                    // Add other searchable fields here
                ]
                : undefined,
        };

        // Sorting options
        const orderBy = sortBy ? {
            [sortBy.toString()]: sortOrder === 'desc' ? 'desc' : 'asc',
        } : undefined;

        // Fetch pets from database based on filters
        const pets = await prisma.pet.findMany({
            where: filter,
            orderBy,
            skip: (parseInt(pageNumber) - 1) * parseInt(limitNumber),
            take: parseInt(limitNumber),
        });

        // Fetch total count of pets for pagination meta
        const totalPetsCount = await prisma.pet.count({ where: filter });

     
        return {
            meta: {
                page: parseInt(pageNumber),
                limit: parseInt(limitNumber),
                total: totalPetsCount
            },
            data: pets
        };
    } catch (error) {
        throw new Error('Failed to fetch pets: ' + error);
    }
};

const updatePetProfile = async (req: Request) => {
    const { petId } = req.params;
    const updateData = req.body;

    try {
        // Ensure petId is provided
        if (!petId) {
            throw new Error('Pet ID is required');
        }

        // Retrieve the pet from the database
        const pet = await prisma.pet.findUnique({
            where: {
                id: petId,
            },
        });

        // Ensure pet exists
        if (!pet) {
            throw new Error('Pet not found');
        }

        // Update the pet's data
        const updatedPet = await prisma.pet.update({
            where: {
                id: petId,
            },
            data: updateData,
        });

        return updatedPet;
    } catch (error) {
        throw new Error('Failed to update pet profile: ' + error);
    }
};





export const petService={

    addPetIntoDB,
    getPaginatedFilteredPets,
    updatePetProfile

} 
