import { connect } from "./connect";
import { createChannel } from "./createChannel";
import { disconnect } from "./disconnect";

export const ConnectionUtil = {
  connect,
  createChannel,
  disconnect,
};

Object.freeze(ConnectionUtil);
