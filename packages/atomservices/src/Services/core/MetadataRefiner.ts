import { EventStream } from "atomservicescore";

interface IInternalMetadata {
  dispatch?: {
    time: number;
  };
}

export const MetadataRefiner = {
  consume: (metadata: EventStream.IStreamMetadata): EventStream.IStreamMetadata => {
    const { __, ...others } = metadata;
    const internal: IInternalMetadata = __ || {};
    const computed: any = {};

    if (internal.dispatch && internal.dispatch.time) {
      const now = Date.now();
      const { time } = internal.dispatch;
      computed.duration = now - time;
    }

    return Object.assign({}, others, computed);
  },
  dispatch: (metadata: EventStream.IStreamMetadata): EventStream.IStreamMetadata => {
    const internal: IInternalMetadata = {
      dispatch: {
        time: Date.now(),
      },
    };

    return Object.assign({}, metadata, { __: internal });
  },
};
