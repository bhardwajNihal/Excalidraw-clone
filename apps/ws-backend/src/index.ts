// Initializing the Websockect server
// Defining the real time chatting and message broadcasting logic

import { WebSocketServer } from "ws";
import jwt from 'jsonwebtoken'
import {JWT_SECRET} from '@repo/common-configs/config'

const wss = new WebSocketServer({port:8080});
console.log("Websocket Server active on port 8080");

// type for jwt token
interface decodedToken{
    userId : string
}

function verifyToken(token:string): string | null {

    try {
        const decoded = jwt.verify(token,JWT_SECRET as string) as decodedToken;
        if(!decoded || !decoded.userId){
            return null;
        }
        return decoded.userId

    } catch (error) {
        console.error("Token Validation failed!");
        return null;
    }
}

wss.on('connection', (ws, req) => {

// verify token
// ws doesn't support headers, so tokens are to be passed as queryparams
   const params = new URLSearchParams(req.url?.split('?')[1]);              // way to extrats params from ws url
   const token = params.get('token') || ""                          // url = ws://localhost:3001?token=${yourToken}
   const VerifiedUser = verifyToken(token);
   
   if(VerifiedUser == null){
    ws.close(4003, 'User not Authenticated!');                  // code convention in ws differ from http
    return
   }


// Authenticated operations from here

    ws.on('message', () => {
        ws.send("pong")
    })
})
