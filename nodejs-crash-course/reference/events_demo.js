const EventEmitter = require('events');

// Create Class
class MyEmitter extends EventEmitter{ }

// Init Object
const myEmitter = new MyEmitter();


// Event Listener
myEmitter.on('event', () => console.log('Event Fired....!'));

myEmitter.emit('event');
myEmitter.emit('event');
myEmitter.emit('event');