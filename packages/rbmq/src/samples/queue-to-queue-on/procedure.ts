import { connectMQ } from "../../connectMQ";

(async () => {
  const connection = await connectMQ();
  const channel = await connection.createChannel();
  const q = "p.queue";

  await channel.assertQueue(q, { autoDelete: true });
  const listener = (msg: any) => console.log("data: ", msg.payloads);

  const on = channel.toOnMessage(listener);
  channel.consume(q, on);

  const data = {
    payloads: {
      key: "value",
    },
  };
  const text = JSON.stringify(data);
  const content = Buffer.from(text);

  const shotout1 = () => setTimeout(() => channel.sendToQueue(q, content), 500);
  const shotout2 = () => setTimeout(() => channel.sendToQueue(q, content), 1000);
  const shotout3 = () => setTimeout(() => channel.sendToQueue(q, content), 2000);

  shotout1();
  shotout2();
  shotout3();
})();
