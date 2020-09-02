const Person = require('./person');
const Logger = require('./logger');

const person1 = new Person('John Snow', 30);
person1.greeting();

const logger = new Logger();
logger.on('message', (data) => console.log(`Listener :` , data));

logger.log('Event Emitter is being shown here....');