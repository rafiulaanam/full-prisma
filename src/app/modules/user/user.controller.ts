import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import httpStatus from "http-status";
import { userService } from "./user.service";

export interface CustomRequest extends Request {
    user: any; 
}


const createUser = catchAsync(async (req: Request, res: Response) => {

    const result = await userService.createUserIntoDB(req);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User Created successfully!",
        data: result
    })
});
const getUser = catchAsync(async (req: Request, res: Response) => {

    const result = await userService.getUserProfile(req);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User retrived successfully!",
        data: result
    })
});
const updateUser = catchAsync(async (req: Request, res: Response) => {

    const result = await userService.updateUserProfile(req);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User retrived successfully!",
        data: result
    })
});



export const userController = {
    createUser,
    getUser,
    updateUser
   
}