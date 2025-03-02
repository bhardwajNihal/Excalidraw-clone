import express from 'express'
import { Request, Response } from 'express';
const app = express();

app.post("signup", (req:Request,res:Response) => {

})

app.post("signin", (req:Request,res:Response) => {

})

app.post("create-room", (req:Request,res:Response) => {

})

app.listen(3001, () => {
    console.log("app listening on port 3001");
})