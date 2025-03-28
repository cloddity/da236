const { Kafka } = require('kafkajs');

async function consume() {
  const kafka = new Kafka({
    clientId: 'demo-consumer',
    brokers: ['localhost:9092'],
  });

  const consumer = kafka.consumer({ groupId: 'test-group' });

  console.log('Connecting Consumer...');
  await consumer.connect();
  console.log('Consumer Connected!');

  await consumer.subscribe({ topic: 'demo-topic', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        partition,
        offset: message.offset,
        key: message.key.toString(),
        value: message.value.toString(),
      });
    },
  });
}

consume().catch(console.error);
