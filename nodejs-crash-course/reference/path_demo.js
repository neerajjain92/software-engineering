const path = require('path');

// Parse the file
var pathObj = path.parse(__filename);
console.log(pathObj);

// Base file name
console.log('Base File Name', path.basename(__filename));


// Directory name
console.log('Directory Name', path.dirname(__filename));

// File Extension
console.log('Extension is ', path.extname(__filename));

// Create path object
console.log("Path Object is ", path.parse(__filename).base);

// Concatenate Paths
// ../test/hello.html
console.log(path.join(__dirname, 'test', 'hello.html'));