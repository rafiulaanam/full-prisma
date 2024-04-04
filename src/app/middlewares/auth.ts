import jwt, { Secret } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import config from '../../config';

export const authMiddleware = (req: Request & { user?: any }, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
        jwt.verify(token, config.jwt.jwt_secret as Secret, (err, decodedToken) => {
            if (err) {
                return res.status(401).json({ message: 'Invalid token' });
            } else {
                // Set userId on the request object
                req.user = decodedToken;
                next();
            }
        });
    } else {
        res.status(401).json({ message: 'Token not provided' });
    }
};
