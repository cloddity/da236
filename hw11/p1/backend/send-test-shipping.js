const { Kafka } = require("kafkajs");

async function sendTestOrder() {
  const kafka = new Kafka({ clientId: "test-order", brokers: ["localhost:9092"] });
  const producer = kafka.producer();
  const admin = kafka.admin();
  
  try {
    await producer.connect();
    await admin.connect();

    const testOrder = {
      orderId: "order-" + Date.now(),
      itemId: "product-123",
      itemName: "Test Product",
      quantity: 2
    };

    await producer.send({
      topic: "order-confirmed",
      messages: [{ value: JSON.stringify(testOrder) }]
    });
    
    console.log("Test order sent successfully");
    
  } catch (error) {
    console.error("Error:", error.message);
  } finally {
    await producer.disconnect();
    await admin.disconnect();
  }
}

sendTestOrder();