// const kafka = require("kafkajs").Kafka
const { Kafka } = require("kafkajs");

run();
async function run() {
  try {
    const kafka = new Kafka({
      clientId: "myapp",
      brokers: ["localhost:9092"],
    });

    const admin = kafka.admin();
    console.log("Connecting to Kafka.......");
    await admin.connect();
    console.log("Connected...");

    // A to M (Partition 1)
    // N to Z (Partition 2)
    await admin.createTopics({
      topics: [
        {
          topic: "users",
          numPartitions: 2,
        },
      ],
    });
    console.log("Partition created successfully");
    await admin.disconnect();
  } catch (ex) {
    console.error(`Something bad happened ${ex}`);
  } finally {
    process.exit();
  }
}
