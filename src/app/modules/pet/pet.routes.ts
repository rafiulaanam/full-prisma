import express, { NextFunction, Request, Response } from 'express';
import { petController } from './pet.controller';
import { authMiddleware } from '../../middlewares/auth';
const router = express.Router();

router.post(
    '/pets',
    
    petController.createPet
)
router.get(
    '/pets',
    
    petController.getPaginatedFilteredPets
)
router.put(
    '/pets/:petId',
    
    authMiddleware,
    petController.updatePetProfile
)


export const petRoutes = router;