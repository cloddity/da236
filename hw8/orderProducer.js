const { Kafka } = require('kafkajs');
const readline = require('readline');

async function runOrderProducer() {
  const kafka = new Kafka({
    clientId: 'order-producer',
    brokers: ['localhost:9092'],
  });

  const producer = kafka.producer();
  await producer.connect();
  console.log('Order Producer connected! List orderId and orderAmount.\n');

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.setPrompt('> ');
  rl.prompt();

  rl.on('line', async (input) => {
    if (input.toLowerCase() === 'exit') {
      rl.close();
      return;
    }

    const [orderId, orderAmount] = input.split(' ');
    const amount = parseFloat(orderAmount);

    if (!orderId || isNaN(amount)) {
      console.log('Invalid input. Format: <orderId> <orderAmount>');
      rl.prompt();
      return;
    }

    const message = {
      orderId,
      orderAmount: amount,
      status: 'PENDING',
      timestamp: new Date().toISOString(),
    };

    try {
      await producer.send({
        topic: 'orders-topic',
        messages: [{ value: JSON.stringify(message) }],
      });
      console.log('Order sent:', message);
    } catch (err) {
      console.error('Error sending order:', err);
    }

    rl.prompt();
  });

  rl.on('close', async () => {
    await producer.disconnect();
    console.log('\nOrder Producer exited.');
    process.exit(0);
  });
}

runOrderProducer().catch(console.error);
