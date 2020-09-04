import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../configuration/authentication';
import AppError from '../errors/AppError';

interface TokenPayload {
    iat: number,
    exp: number,
    sub: string,
}

function constultAuthentication(request: Request, response: Response, next: NextFunction): void {
    const authHeader = request.headers.authorization;

    if(!authHeader) {
        throw new AppError('Token JWT é necessário', 401);
    }

    const [, token] = authHeader.split(" ");
    try {
        const decode = verify(token, authConfig.jwt.secret);

        const { sub } = decode as TokenPayload;

        request.user = {
            id: sub,
        }

        return next();
    } catch (err) {
        throw new AppError('Token JWT inválido', 401);
    }
}

export default constultAuthentication;
