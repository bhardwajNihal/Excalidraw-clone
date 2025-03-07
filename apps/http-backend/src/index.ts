
import express from 'express';
import { Request, Response } from 'express';
import { AuthMiddleware, signupUserSchema, signinUserSchema, createRoomSchema } from "@repo/common-configs/config"
import { prismaClient } from '@repo/db';
import bcrypt from 'bcrypt'

const app = express();
app.use(express.json())


async function connectToDB() {
    try {
        await prismaClient.$connect();
        console.log("Connected to the database.");
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1); 
    }
}


app.post("/signup", async(req:Request,res:Response)=>{
    
    const parsedData = signupUserSchema.safeParse(req.body);

    if(!parsedData.success){
        res.status(403).json({
            message: "Invalid Input format!",
            error : parsedData.error.message
        })
        return;
    }

    const {name, email, password} = req.body;

    const isEmailExists = await prismaClient.user.findFirst({
        where:{email}
    });

    if(isEmailExists){
        res.status(403).json({
            message : "Email Already Exists!"
        })
        return;
    }

    const hashedPassword = await bcrypt.hash(password,10);

    await prismaClient.user.create({
        data:{
            name : name,
            email : email, 
            password : hashedPassword
        }
    })

    res.json({
        message : "User signed Up successfully!"
    })

})

app.post("/signin", (req:Request,res:Response)=>{
    res.send("signin endpoint!")
})

app.post("/chat", (req:Request,res:Response)=>{
    res.send("chat endpoint!")
})


async function startServer() {
    await connectToDB();
    app.listen(3001, ()=>{
        console.log("Server listening at port 3001");
    })
}
startServer()
