import express from 'express';
import { userRoutes } from '../modules/user/user.routes';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { petRoutes } from '../modules/pet/pet.routes';
import { adoptionRequestRoutes } from '../modules/adoptionRequest/adoptionRequest.routes';

const router = express.Router();

const moduleRoutes = [
    {
        path: '/',
        route: userRoutes
    },
    {
        path: '/',
        route: AuthRoutes
    },
    {
        path: '/',
        route: petRoutes
    },
    {
        path: '/',
        route: adoptionRequestRoutes
    },
    
];

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router;