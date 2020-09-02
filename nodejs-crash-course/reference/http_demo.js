const http = require('http');

// Create a Server Object
http.createServer((req, res) => {
    // Write a response
    res.write('Hello World...');
    res.end();
}).listen(5000, () => console.log('Server is listening on 5000 port'));