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
  const x = "x.exchange";

  await channel.assertExchange(x, "fanout", { autoDelete: true });

  const shotout1 = () => setTimeout(() => channel.publish(x, "", content), 500);
  const shotout2 = () => setTimeout(() => channel.publish(x, "", content), 1000);
  const shotout3 = () => setTimeout(() => channel.publish(x, "", content), 2000);

  shotout1();
  shotout2();
  shotout3();
})();
