// Initializing the Websockect server
// Defining the real time chatting and message broadcasting logic

import { WebSocket, WebSocketServer } from "ws";
import jwt, { JsonWebTokenError } from 'jsonwebtoken'
import {JWT_SECRET} from '@repo/common-configs/config'
import { prismaClient } from "@repo/db";

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


// maintaining users array globally:
interface joinedUser{
    userId : string,
    currentUserSocket : WebSocket,
    rooms : string[]
}
const Users:joinedUser[] = []

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

   Users.push({
    userId : VerifiedUser,
    rooms : [],
    currentUserSocket : ws
   })

    ws.on('message', async(data) => {
        const parsedData = JSON.parse(data as unknown as string);       // data recieved is in the form of string. But TS doesn't know it, so casting it to unknown and then to string

        // Join-room request
        if(parsedData.type == "join-room"){         //data : {"type":"join-room","roomId":1}

            // Check if room exists
            const findRoom = await prismaClient.room.findFirst({
                where : {id: parsedData.roomId}
            })
            if(!findRoom){
                ws.send(JSON.stringify({
                    message : "Room doesn't exists!"
                }))
                return;
            }
            const user = Users.find(user => user.currentUserSocket == ws);
            user?.rooms.push(parsedData.roomId);
            return;
        }

        // leave-room request
        if(parsedData.type == "leave-room"){        //data : {"type":"leave-room","roomId":1}
            const user = Users.find(user => user.currentUserSocket == ws);
            if(!user) return;
            user.rooms = user?.rooms.filter(room => room !== parsedData.roomId)
            return;
        }

        //Chat request
        if(parsedData.type = "chat"){
            const roomId = parsedData.roomId;
            const checkRoom = Users.find(user => user.rooms.includes(roomId))
            if(!checkRoom){
                ws.send("Join to a room First!")
            }
            const message = parsedData.message;

            // storing the chat in the database - not the best appraoch but works here(ideally some advanced concepts are used - something called queues, etc)
            await prismaClient.chat.create({
                data:{
                    userId : VerifiedUser,
                    roomId,
                    message
                }
            })
            // finally broadcasting the message to every user in the room
            Users.forEach(user => {
                if(user.rooms.includes(roomId)){
                    user.currentUserSocket.send(JSON.stringify({
                        type:"chat",
                        roomId,
                        message
                    }))
                } 
            })
        }


    })
})
