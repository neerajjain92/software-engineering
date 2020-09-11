const http = require("http");
const { response } = require("express");
const app = require("express")(); // Hosting our Client index.html in this case
app.get("/", (req, res) => res.sendFile(__dirname + "/index.html"));
app.listen(9091, () => console.log("Listening on port 9091...."));

const WebSocketServer = require("websocket").server;
const httpServer = http.createServer();

httpServer.listen(9090, () => console.log("Listening on 9090......"));

// HashMap of <ClientId, ConnectionObject>
const clients = {};
const games = {};

const webServer = new WebSocketServer({
  httpServer: httpServer,
});

webServer.on("request", (request) => {
  // Some Client wants to connect, this is the upgrade request
  const connection = request.accept(null, request.origin);

  connection.on("open", () => console.log("Opened....!"));
  connection.on("close", () => console.log("Closed....!"));

  connection.on("message", (message) => {
    // I have received a message from the client
    const result = JSON.parse(message.utf8Data);

    if (result.method === "createGame") {
      createGame(result);
    }
    if (result.method === "joinGame") {
      joinGame(result);
    }
    if (result.method === "play") {
      playGame(result);
    }
  });

  // Generate a new Client ID
  const clientId = guid();
  clients[clientId] = {
    connection: connection,
  };

  const payload = {
    method: "connect",
    clientId: clientId,
  };

  // Send back the client connect
  connection.send(JSON.stringify(payload));
});

// A User Wants to create a new Game

/**
 * Request:
 * {
 *   "method": "create",
 *   "clientId": <guid>
 * }
 *
 * Response:
 * {
 *   "method": "create",
 *   "game": {
 *      "id": <guid>
 *      "Balls": int
 *   }
 * }
 */
function createGame(result) {
  const clientId = result.clientId;
  const gameId = guid(); // New Game Id

  games[gameId] = {
    id: gameId,
    balls: 20, // Only 20 cells,
    clients: [],
    state: {}
  };

  const payload = {
    method: "create",
    game: games[gameId],
  };

  const conn = clients[clientId].connection;
  conn.send(JSON.stringify(payload));
}

function joinGame(result) {
  /**
   * A User wants to JOIN Game.....
   *
   * Request
   * {
   *  "method": "joinGame",
   *  "clientId": <guid>
   *  "gameId": <guid>
   * }
   *
   * Response
   * {
   *  "method": "joinGame",
   *  "game": {
   *      "id": <guid>
   *      "balls": int,
   *      "clients": [guid, color]
   *  }
   * }
   */
  const clientId = result.clientId;
  const gameId = result.gameId;
  const game = games[gameId];
  if (game.clients.length >= 3) {
    // Sorry Max Player reached
    return;
  }
  const color = { 0: "Red", 1: "Green", 2: "Blue" }[game.clients.length];
  game.clients.push({
    clientId: clientId,
    color: color,
  });

  if (game.clients.length === 3) {
    updateGameState();
  }

  // Broadcast Payload for a new player joining
  const payload = {
    method: "join",
    game: game,
  };

  // Loop through all the clients and tell them a new player has joined
  game.clients.forEach((c) => {
    clients[c.clientId].connection.send(JSON.stringify(payload));
  });
}

function playGame(result) {
  const clientId = result.clientId;
  const gameId = result.gameId;
  const ballId = result.ballId;
  const color = result.color;

  const state = games[gameId].state;
  if (!state) {
    state = {};
  }

  state[ballId] = color;
  games[gameId].state = state; // Update state for a game.
}

/**
 * Every 5 millisecond Server will broadcast current state of game to all connected clients.
 */
function updateGameState() {
  for (const g of Object.keys(games)) {
    const game = games[g];
    const payload = {
      method: "update",
      game: game,
    };

    games[g].clients.forEach((c) => {
      clients[c.clientId].connection.send(JSON.stringify(payload));
    });
  }

  setTimeout(updateGameState, 500);
}
function S4() {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

// then to call it, plus stitch in '4' in the third group
const guid = () =>
  (
    S4() +
    S4() +
    "-" +
    S4() +
    "-4" +
    S4().substr(0, 3) +
    "-" +
    S4() +
    "-" +
    S4() +
    S4() +
    S4()
  ).toLowerCase();
