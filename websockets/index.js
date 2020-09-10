const http = require("http"); // Raw Http Server
const WebSocketServer = require("websocket").server; // Raw WebSocket server which allows to perform handshake
let connection = null;

const httpServer = http.createServer((req, res) => {
  console.log("We have received a request");
});

// WebSocket works on top of Http1.1 and then the upgrade will happen
// hence we need to pass the HttpServer instance to this.
const websocket = new WebSocketServer({
  httpServer: httpServer,
});
httpServer.listen(8080, () => console.log("My Server is listening on 8080"));

// When a legit websocket request comes listen to it and get the connection ..
// once you get a connection that's it!
websocket.on("request", (request) => {
  // When we accept the request, that will send the
  // switching protocol response as mentioned in ReadMe.md and we get connection as a result

  connection = request.accept(null, request.origin);

  connection.on("open", () => console.log("Opened...!!"));
  connection.on("close", () => console.log("Closed...!!"));

  connection.on("message", (message) => {
    console.log(`Received Message from Client :  ${message.utf8Data}`);
    connection.send(`Got Your Message: ${message.utf8Data}`);
  });

  sendEvery5Seconds();
});

function sendEvery5Seconds() {
  connection.send(`Message :: ${Math.random()}`);
  setTimeout(sendEvery5Seconds, 5000);
}
