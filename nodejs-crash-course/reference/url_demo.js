const url = require('url');

const myUrl = new URL('http://mywebsite.com:8080/hello.html?id=100&status=active');

// Serialized URL
console.log(myUrl.href);
console.log(myUrl.toString());

// Host (root domain)
console.log(myUrl.host);

// HostName (does not get the port)
console.log(myUrl.hostname);

// Pathname
console.log(myUrl.pathname);

// Serialized query
console.log(myUrl.search);

// Params Object
console.log(myUrl.searchParams);

// Add param
myUrl.searchParams.append('empId', '123');
console.log(myUrl.searchParams);

// Loop through params
myUrl.searchParams.forEach((value, name) => console.log(`${name} :: ${value}`));