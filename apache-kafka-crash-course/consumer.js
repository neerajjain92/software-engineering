// const kafka = require("kafkajs").Kafka
const { Kafka } = require("kafkajs");

run();
async function run() {
  try {
    const kafka = new Kafka({
      clientId: "myapp",
      brokers: ["localhost:9092"],
    });

    const consumer = kafka.consumer({
      "groupId": "test",
    });
    console.log("Consumer Connecting......");
    await consumer.connect();
    console.log("Consumer Connected to Kafka....");

    await consumer.subscribe({
      topic: "users",
      fromBeginning: true,
    });

    await consumer.run({
      eachMessage: async (result) => {
        console.log(
          `Received message ${result.message.value} on partition ${result.partition}`
        );
      },
    });
  } catch (ex) {
    console.error(`Something bad happened ${ex}`);
  }
}
