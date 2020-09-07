// const kafka = require("kafkajs").Kafka
const { Kafka } = require("kafkajs");

// Command Line Argument
// node producer.js Hello
// [0]    [1]        [2]  =======> Index in command line.
const msg = process.argv[2];

run();
async function run() {
  try {
    const kafka = new Kafka({
      clientId: "myapp",
      brokers: ["localhost:9092"],
    });

    const producer = kafka.producer();
    console.log("Producer Connecting......");
    await producer.connect();
    console.log("Producer Connected to Kafka....");

    //First Letter:  A-M 0 N-Z 1
    const partition = msg[0] < "N" ? 0 : 1;

    const result = await producer.send({
      topic: "users",
      messages: [
        {
          value: msg,
          "partition": partition
        },
      ],
    });

    console.log(`Message ${msg} produced to partition ${partition} successfully! ${JSON.stringify(result)}`);
    await producer.disconnect();
  } catch (ex) {
    console.error(`Something bad happened ${ex}`);
  } finally {
    process.exit();
  }
}
