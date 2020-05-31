import { connectMQ } from "../../connectMQ";

(async () => {
  const data = {
    payloads: {
      key: "value",
    },
  };
  const text = JSON.stringify(data);
  const content = Buffer.from(text);

  const connection = await connectMQ();
  const channel = await connection.createChannel();
  const q = "d.queue";

  await channel.assertQueue(q, { autoDelete: true });

  const shotout1 = () => setTimeout(() => channel.sendToQueue(q, content), 500);
  const shotout2 = () => setTimeout(() => channel.sendToQueue(q, content), 1000);
  const shotout3 = () => setTimeout(() => channel.sendToQueue(q, content), 2000);

  shotout1();
  shotout2();
  shotout3();
})();
