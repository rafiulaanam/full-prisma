import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import httpStatus from "http-status";
import { petService } from "./pet.service";

const createPet = catchAsync(async (req: Request, res: Response) => {

    const result = await petService.addPetIntoDB(req);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Pet Created successfully!",
        data: result
    })
});

const getPaginatedFilteredPets = catchAsync(async (req: Request, res: Response) => {
    const result = await petService.getPaginatedFilteredPets(req);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Pets retrieved successfully!",
        meta:result.meta,
        data: result.data
    });
});

const updatePetProfile = catchAsync(async (req: Request, res: Response) => {
    const result = await petService.updatePetProfile(req);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Pet profile updated successfully",
        data: result
    });
});




export const petController = {
    createPet,
    getPaginatedFilteredPets,
    updatePetProfile,
   
}