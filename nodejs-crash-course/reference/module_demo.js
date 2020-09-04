function greet(name) {
    console.log(`Hello ${name}, Welcome to Dream Land`);
}

// Exporting this greet function from module.
module.exports.greet = greet;
// console.log(module);