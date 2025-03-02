import { WebSocketServer } from 'ws';

const wss = new WebSocketServer( {port : 8080} )

console.log("ws server active on port 8080");


wss.on('connection' , (ws:any) => {

    ws.on('message', (message:any) => {
        ws.send("pong")
        console.log(message);
        
    })
})