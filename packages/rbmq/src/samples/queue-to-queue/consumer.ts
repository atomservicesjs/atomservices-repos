import { connectMQ } from "../../connectMQ";

(async () => {
  const connection = await connectMQ();
  const channel = await connection.createChannel();
  const q = "d.queue";

  await channel.assertQueue(q, { autoDelete: true });
  channel.consume(q, (msg) => {
    if (msg !== null) {
      const text = msg.content.toString();
      const data = JSON.parse(text);

      console.log("data: ", data.payloads);
    }
  });
})();
