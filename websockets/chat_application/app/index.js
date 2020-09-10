const http = require("http");
const WebSocketServer = require("websocket").server;
const redis = require("redis");
const APPID = process.env.APPID;
let connections = [];

// 2 Connection to Redis from WebSocket server
// In-order to push new messages to redis and at any moment 
// receive messages from redis, Sadly we can't use the same TCP connection 
// for both and hence 2 clients.
const subscriber = redis.createClient({
  port: 6379,
  host: "rds",
});

const publisher = redis.createClient({
  port: 6379,
  host: "rds",
});

subscriber.on("subscribe", function(channel, count) {
    console.log(`Server ${APPID} subscribed to live chat`);
    publisher.publish("livechat", "a message");
});

subscriber.on("message", function(channel, message) {
    try {
        console.log(
          `Server ${APPID} received message in channel: ${channel} msg: ${message}`
        );
        connections.forEach(c => c.send(APPID + ":" + message));
    } catch(ex) {
        console.log("ERR::" + ex);
    }
});

subscriber.subscribe("livechat");


// Now let's handle websocket
//create a raw http server (this will help us create the TCP which will then pass to the websocket to do the job)
const httpServer = http.createServer();

//pass the httpserver object to the WebSocketServer library to do all the job, this class will override the req/res
const websocket = new WebSocketServer({
  httpServer: httpServer,
});


httpServer.listen(8080, () => console.log("My Server is listening on port 8080"));

//when a legit websocket request comes listen to it and get the connection .. once you get a connection thats it! 
websocket.on("request", request => {
    const connection = request.accept(null, request.origin);
    connection.on("open", () => console.log("opened"));
    connection.on("close", () =>  console.log("CLOSED...!!"));
    connection.on("message", (message) => {
      // Publish the message to Redis
      console.log(`${APPID} Received message ${message.utf8Data}`);
      publisher.publish("livechat", message.utf8Data);
    });

    setTimeout(() => connection.send(`Connected successfully to Server ${APPID}`), 5000);
    connections.push(connection);
});