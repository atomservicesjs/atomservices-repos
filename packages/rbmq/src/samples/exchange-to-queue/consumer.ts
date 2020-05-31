import { connectMQ } from "../../connectMQ";

(async () => {
  const connection = await connectMQ();
  const channel = await connection.createChannel();
  const x = "x.exchange";

  await channel.assertExchange(x, "fanout", { autoDelete: true });

  const q = await channel.assertQueue("", { autoDelete: true });
  await channel.bindQueue(q.queue, x, "");

  channel.consume(q.queue, (msg) => {
    if (msg !== null) {
      const text = msg.content.toString();
      const data = JSON.parse(text);

      console.log("data: ", data.payloads);
    }
  });
})();
