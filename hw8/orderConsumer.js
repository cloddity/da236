const { Kafka } = require('kafkajs');

async function consume() {
  const kafka = new Kafka({
    clientId: 'order-consumer',
    brokers: ['localhost:9092'],
  });

  const consumer = kafka.consumer({ groupId: 'order-group' });

  console.log('Connecting Order Consumer...');
  await consumer.connect();
  console.log('Order Consumer Connected!');

  await consumer.subscribe({ topic: 'orders-topic', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const value = JSON.parse(message.value.toString());

      console.log({
        topic,
        partition,
        offset: message.offset,
        ...value,
      });
    },
  });
}

consume().catch(console.error);
