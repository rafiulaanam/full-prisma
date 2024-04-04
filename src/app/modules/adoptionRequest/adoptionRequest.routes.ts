import express, { NextFunction, Request, Response } from 'express';
import { petController } from './adoptionRequest.controller';
import { authMiddleware } from '../../middlewares/auth';
const router = express.Router();

router.post(
    '/pets',
    
    petController.createPet
)
router.get(
    '/pets/adoption-request',
    
    petController.getRequestPets
)
router.put(
    '/adoption-requests/:requestId',
    
    authMiddleware,
    petController.updatePetProfile
)
router.post(
    '/pets/adoption-request',
    
    authMiddleware,
    petController.submitAdoptionRequest
)

export const adoptionRequestRoutes = router;