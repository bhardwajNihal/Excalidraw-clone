// defining global auth middleware, using jwt

import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { JWT_SECRET } from './config';



export function AuthMiddleware(req:Request, res:Response, next:NextFunction){

    const header =  req.headers.authorization;

    if(!header){
        res.status(411).json({
            message: "Headers not provided!"
        })
        return;
    }

    const token = header?.split(" ")[1];

    const verifyToken = jwt.verify(token as string , JWT_SECRET as string) as JwtPayload;

    if(!verifyToken){
        res.status(411).json({
            message : "Invalid Token!"
        })
        return;
    }
    //@ts-ignore
    req.userId = verifyToken.userId;

    next();

}