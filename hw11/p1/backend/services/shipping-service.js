const { Kafka } = require("kafkajs");
const connectDB = require("../db");
const Shipping = require("../models/ShippingModel");
const { v4: uuidv4 } = require("uuid");

const kafka = new Kafka({ clientId: "shipping", brokers: ["localhost:9092"] });
const consumer = kafka.consumer({ groupId: "shipping-group" });

async function generateTrackingId() {
  const randomPart = uuidv4().substring(0, 8).toUpperCase();
  return `SHIP-${randomPart}`;
}

async function start() {
  await connectDB();
  console.log("MongoDB connected");
  
  await consumer.connect();
  
  await consumer.subscribe({ topic: "order-confirmed", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      try {
        const msg = JSON.parse(message.value.toString());
        console.log("Received order confirmation:", msg);

        const trackingId = await generateTrackingId();

        const newShipping = await Shipping.create({
          itemId: msg.itemId,
          itemName: msg.itemName,
          quantity: msg.quantity,
          trackingId: trackingId,
          status: "pending"
        });

        console.log(`Shipping record created with tracking ID: ${trackingId}`);
        
      } catch (error) {
        console.error("Error processing message:", error);
      }
    },
  });
  
  console.log("Shipping service is running and waiting for orders...");
}

start().catch(error => {
  console.error("Error starting shipping service:", error);
  process.exit(1);
});