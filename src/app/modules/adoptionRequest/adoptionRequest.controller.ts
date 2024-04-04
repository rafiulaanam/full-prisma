import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import httpStatus from "http-status";
import { petService } from "./adoptionRequest.service";

const createPet = catchAsync(async (req: Request, res: Response) => {

    const result = await petService.addPetIntoDB(req);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Pet Created successfully!",
        data: result
    })
});

const getRequestPets = catchAsync(async (req: Request, res: Response) => {
    const result = await petService.getAdoptionRequests();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Pets adaptation retrieved successfully!",
        data: result
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

const submitAdoptionRequest = catchAsync(async (req: Request, res: Response) => {
    const result = await petService.submitAdoptionRequest(req);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Adoption request submitted successfully",
        data: result
    });
});


export const petController = {
    createPet,
    getRequestPets,
    updatePetProfile,
    submitAdoptionRequest
   
}