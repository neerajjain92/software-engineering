## Agenda

- Connect to Server
- Create Game
- Join Game
- Play
- Broadcast State
- Full Game
- Code!  

--- 
### API SIA

Play ====> Set Ball
```
{
    "method" :"play",
    "clientId" : <guid>,
    "gameId" : <guid>,
    "ballId" : int
}
```

Broadcast Response:
```
{
    "method" : "update",
    game: {
        "id": <guid>,
        "state": [ball, color]
    }
}
```

---

### Example - 3 Clients connect to server.

Client (Request) | Server (Response)
--   | --
 connect() |  JSON{Client Id: A}
 connect() |  JSON{Client Id: B}
 connect() |  JSON{Client Id: C}

---
 ### Client A Creates a game
 Client (Request) | Server (Response)
--   | --
createGame() | JSON{game: Z}

---
### Client B Joins the Game
 Client (Request) | Server (Response)
--   | --
joinGame(Z) | returnGame State (Since there are no other clients in the Game)


### Client C Joins the Game
 Client (Request) | Server (Response)
--   | --
joinGame(Z) | JSON(method: "join", game: {clients: [{B, Red}, {C, Green}]})

