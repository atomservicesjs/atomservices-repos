import { connectMQ } from "../../connectMQ";

(async () => {
  const connection = await connectMQ();
  const channel = await connection.createChannel();
  const q = "d.queue";

  await channel.assertQueue(q, { autoDelete: true });
  const listener = (data: any) => console.log("data: ", data.payloads);

  const on = channel.toOnMessage(listener);
  channel.consume(q, on);
})();
