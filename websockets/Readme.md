# Websockets
### Bidirectional Communication Protocol 
---
## WebSocket Handshake

Client
```
GET /chat HTTP/1.1
Host: server.example.com
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: x3JJHMdDl1EzLkh9GBhXDw==
Sec-WebSocket-Protocol: chat, superchat
Sec-WebSocket-Version: 13
Origin: http://example.com
```

Server
```
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: HSmrc0sM1YUkAGmm5OPpG2HaGwk==
Sec-WebSocket-Protocol: chat
```

## WebSocket UseCase

- Chatting
- Live Feed
- Multiplayer Gaming
- Showing Client progress/logging

### Demo 
- Raw websocket client/server

Run Server
```
node index.js
Put a debug pointer on request.accept line
```

Run Client from Chrome Dev Tools
```
let ws = new WebSocket("ws://localhost:8080") hit enter

ws.onmessage = message => console.log(`We received a message from Server : ${message.data}`);

ws.send("Hello Server, I am client"); // Now Server will receive this message and server can also use the connection to send the message back to client.


ws.close(); // To close the WebSocket 
```