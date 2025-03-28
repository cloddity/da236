const { Kafka } = require('kafkajs');

async function consume() {
  const kafka = new Kafka({
    clientId: 'payment-consumer',
    brokers: ['localhost:9092'],
  });

  const consumer = kafka.consumer({ groupId: 'payment-group' });

  console.log('Connecting Payment Consumer...');
  await consumer.connect();
  console.log('Payment Consumer Connected!');

  await consumer.subscribe({ topic: 'payments-topic', fromBeginning: true });

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
