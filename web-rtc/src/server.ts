import express, { Application } from "express"
import { createServer, Server as HTTPServer } from "http";
import socketIO, { Server as SocketIOServer } from "socket.io"
import * as path from 'path';


export class Server {
    private httpServer: HTTPServer;
    private app: Application;
    private io: SocketIOServer;

    private activeSockets: string[] = [];

    private readonly DEFAULT_PORT = 5000;

    constructor() {
        this.initialize();
    }

    private initialize(): void {
        this.app = express();
        this.httpServer = createServer(this.app);
        this.io = socketIO(this.httpServer);

        this.configureApp();
        this.handleRoutes();
        this.handleSocketConnection();
    }

    private handleRoutes(): void {
        this.app.get("/", (req, res) => {
            res.send(`<h1> Hello World </h1>`);
        });
    }

    private handleSocketConnection(): void {
        this.io.on("connection", socket => {
            console.log("Socket Connected.....");
            const existingSocket = this.activeSockets.find(
                existingSocket => existingSocket === socket.id
            );

            if (!existingSocket) {
                this.activeSockets.push(socket.id); // Storing only the Socket id
                socket.emit("update-user-list", { // Sending this just to sender.
                    // Since he is newly joined so he might need to know all the users already connected in this zoom call.
                    users: this.activeSockets.filter(
                        existingSocket => existingSocket !== socket.id
                    )
                });

                socket.broadcast.emit("update-user-list", { // Sending this to all connected Sockets apart from Sender.
                    // So here all other sockets are already connected and they just need to know this extra client.
                    // and append it.
                    users: [socket.id]
                });
            }

            socket.on("disconnect", () => {
                console.log(`Socket with ${socket.id} disconnected...`);
                this.activeSockets = this.activeSockets.filter(
                    existingSocket => existingSocket !== socket.id
                );
                socket.broadcast.emit("remove-user", {
                    socketId: socket.id
                });
            });

            socket.on("call-user", data => {
                socket.to(data.to).emit("call-made", {
                    offer: data.offer,
                    socket: socket.id
                });
            });

            socket.on("make-answer", data => {
                socket.to(data.to).emit("answer-made", {
                    answer: data.answer,
                    socket: socket.id
                })
            })
        });
    }

    public listen(callback: (port: number) => void): void {
        this.httpServer.listen(this.DEFAULT_PORT, () =>
            callback(this.DEFAULT_PORT)
        );
    }

    public configureApp() {
        this.app.use(express.static(path.join(__dirname, "../public")));
    }
}