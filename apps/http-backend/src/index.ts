
import express from 'express';
import { Request, Response } from 'express';
const app = express();

import { ConnectToDB,JWT_SECRET,DB_URL } from "@repo/common-configs/dist"

console.log("secret : ",JWT_SECRET);
console.log("DB url : ",DB_URL);


app.post("/signup", (req:Request,res:Response)=>{
    res.send("signup endpoint!")
})

app.post("/signin", (req:Request,res:Response)=>{
    res.send("signin endpoint!")
})

app.post("/chat", (req:Request,res:Response)=>{
    res.send("chat endpoint!")
})


ConnectToDB()
.then(() => {
    app.listen(3001, ()=> {
        console.log("server listening on port 3001");
    })
}).catch(()=> {
    console.error("failed to connect to DB!");
    process.exit(1);
})
