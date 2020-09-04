const http = require('http');

// Create a Server Object
http.createServer((req, res) => {
    // Write a response
    res.write('Hello World...');
    res.end();
}).listen(5000, () => console.log('Server is listening on 5000 port'));


const server = http.createServer();

server.on('connection', (socket) => {
    console.log('New Connection...');
});
server.listen(3000);

console.log('Listening on Port 3000');