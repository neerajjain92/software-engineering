
const Person = require('./person');
const Logger = require('./logger');
const Greeting = require('./reference/module_demo');

const person1 = new Person('John Snow', 30);
person1.greeting();

const logger = new Logger();
logger.on('message', data => console.log(`Listener :` , data));

logger.log('Event Emitter is being shown here....');

global.console.log("Instead of window Node has global as the global object");

Greeting.greet('Neeraj');
console.log(Greeting); // This prints out whatever was logged from the module_demo file.
