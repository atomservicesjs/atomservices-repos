import { EventStream } from "atomservicescore";

export const MetadataRefiner = {
  consume: (metadata: EventStream.IStreamMetadata) => {
    const internal = metadata.__ || {};
    const now = Date.now();
    let duration: any;

    const { time } = internal.dispatch || {};

    if (time) {
      duration = now - time;
    }

    return Object.assign({}, metadata, {
      __: {
        ...internal,
        dispatch: {
          duration,
          time,
        },
      },
    });
  },
  dispatch: (metadata: EventStream.IStreamMetadata) => Object.assign({}, metadata, {
    __: {
      dispatch: {
        time: Date.now(),
      },
    },
  }),
};
