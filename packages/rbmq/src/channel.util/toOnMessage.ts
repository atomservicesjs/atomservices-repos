import * as amqplib from "amqplib/callback_api";
export const toOnMessage = (
  process: (data: any) => void,
) => (msg: amqplib.Message | null) => {
  let data: any = null;

  if (msg && msg.content) {
    const text = msg.content.toString();
    data = JSON.parse(text);
  }

  process(data);
};
