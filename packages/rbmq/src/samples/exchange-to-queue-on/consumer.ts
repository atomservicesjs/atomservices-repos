import { connectMQ } from "../../connectMQ";

(async () => {
  const connection = await connectMQ();
  const channel = await connection.createChannel();
  const x = "x.exchange";
  const q = "q";

  await channel.assertExchange(x, "fanout", { autoDelete: true });

  await channel.assertQueue(q, { autoDelete: true, durable: true });
  await channel.bindQueue(q, x, "");

  const process = (data: any, ack: any) => {
    console.log("data: ", data.payloads);
    ack();
  };

  const on = channel.toOnMessageWithAck(process);

  channel.consume(q, on, { noAck: false });
})();
