import { expect } from "chai";
import * as sinon from "sinon";
import { connectMQ } from "./connectMQ";
import { IMQChannel } from "./IMQChannel";
import { IMQConnection } from "./IMQConnection";

describe("testcases", () => {
  let connection: IMQConnection;

  after(async () => {
    connection.disconnect();
  });

  describe("#connectMQ()", () => {
    let channel: IMQChannel;
    const exchanges = {
      fanout: "test.exchange.fanout",
    };
    const queues = {
      queue1: "queue1",
      queue2: "queue2",
      queue3: "queue3",
      zqueue: "zqueue",
    };

    const xmessage = sinon.spy();
    const qmessage = sinon.spy();

    after(() => {
      expect(xmessage.called).to.equal(true);
      expect(qmessage.called).to.equal(true);
    });

    it("expect to create connection and channel", async () => {
      // arranges

      // acts
      connection = await connectMQ();
      channel = await connection.createChannel();

      // asserts
      expect(channel).not.to.equal(null);
      expect(channel).not.to.equal(undefined);
    });

    describe("#Exchange", () => {
      it("expect to assert an exchange", async () => {
        // arranges
        const expected = {
          exchange: "test.exchange.fanout",
        };

        // acts
        const result = await channel.assertExchange(exchanges.fanout, "fanout");

        // asserts
        expect(result).to.deep.equal(expected);
      });

      it("expect to check an exchange", async () => {
        // arranges
        const expected = {};

        // acts
        const result = await channel.checkExchange(exchanges.fanout);

        // asserts
        expect(result).to.deep.equal(expected);
      });

      it("expect to delete an exchange", async () => {
        // arranges
        const expected = {};

        // acts
        const result = await channel.deleteExchange(exchanges.fanout);

        // asserts
        expect(result).to.deep.equal(expected);
      });
    });

    describe("#Queue", () => {
      before(async () => {
        const data = { key: "value" };
        const text = JSON.stringify(data);
        const content = Buffer.from(text);

        await channel.assertQueue(queues.zqueue, { autoDelete: true });
        await channel.consume(queues.zqueue, qmessage);
        await channel.sendToQueue(queues.zqueue, content);
      });

      it("expect to assert a queue", async () => {
        // arranges
        const expected = {
          consumerCount: 0,
          messageCount: 0,
          queue: "queue1",
        };

        // acts
        const result = await channel.assertQueue(queues.queue1);

        // asserts
        expect(result).to.deep.equal(expected);
      });

      it("expect to check a queue", async () => {
        // arranges
        const expected = {
          consumerCount: 0,
          messageCount: 0,
          queue: "queue1",
        };

        // acts
        const result = await channel.checkQueue(queues.queue1);

        // asserts
        expect(result).to.deep.equal(expected);
      });

      it("expect to delete a queue", async () => {
        // arranges
        const expected = {
          messageCount: 0,
        };

        // acts
        const result = await channel.deleteQueue(queues.queue1);

        // asserts
        expect(result).to.deep.equal(expected);
      });
    });

    describe("#exchange-to-queue", () => {
      it("expect to bind a queue", async () => {
        // arranges
        await channel.assertExchange(exchanges.fanout, "fanout", { autoDelete: true });
        await channel.assertQueue(queues.queue1, { autoDelete: true });
        const expected = {};

        // acts
        const result: any = await channel.bindQueue(queues.queue1, exchanges.fanout, "");

        // asserts
        expect(result).to.deep.equal(expected);
      });

      it("expect to consume a queue", async () => {
        // arranges
        const expected = {
          consumerTag: "",
        };

        // acts
        const result = await channel.consume(queues.queue1, xmessage);
        expected.consumerTag = result.consumerTag;

        // asserts
        expect(result).to.deep.equal(expected);
      });

      it("expect to publish a content", async () => {
        // arranges
        await channel.assertQueue(queues.queue2, { autoDelete: true });
        await channel.assertQueue(queues.queue3, { autoDelete: true });

        await channel.consume(queues.queue2, xmessage);
        await channel.consume(queues.queue3, xmessage);
        const data = { key: "value" };
        const text = JSON.stringify(data);
        const content = Buffer.from(text);

        // acts
        const result = await channel.publish(exchanges.fanout, "", content);

        // asserts
        expect(result).to.equal(true);
      });
    });

    describe("#queue-to-queue", () => {
      it("expect to assert a queue", async () => {
        // arranges
        const expected = {
          consumerCount: 1,
          messageCount: 0,
          queue: "zqueue",
        };

        // acts
        const result = await channel.assertQueue(queues.zqueue, { autoDelete: true });

        // asserts
        expect(result).to.deep.equal(expected);
      });

      it("expect to consume a queue", async () => {
        // arranges
        const expected = {
          consumerTag: "",
        };

        // acts
        const result = await channel.consume(queues.zqueue, qmessage);
        expected.consumerTag = result.consumerTag;

        // asserts
        expect(result).to.deep.equal(expected);
      });

      it("expect to send to a queue", async () => {
        // arranges
        const data = { key: "value" };
        const text = JSON.stringify(data);
        const content = Buffer.from(text);

        // acts
        const result = await channel.sendToQueue(queues.zqueue, content);

        // asserts
        expect(result).to.equal(true);
      });
    });
  });
});
