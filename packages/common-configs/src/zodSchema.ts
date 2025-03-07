import {z} from 'zod';

export const signupUserSchema = z.object({
    name : z.string().min(2).max(100),
    email : z.string().email().min(2).max(200),
    password : z.string().min(6),
})

export const signinUserSchema = z.object({
    name : z.string().min(2).max(100),
    email : z.string().email().min(2).max(200),
    password : z.string().min(6),
})

export const createRoomSchema = z.object({
    name : z.string().min(3).max(100)
})
