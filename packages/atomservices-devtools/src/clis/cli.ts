import { Services } from "archappenv";
import { Util } from "archappenv";

import { init, service, sfc } from "./commands";
import { resolveTSBase } from "./resolveTSBase";

export const cli = () => {
  const argv = Services.processArgv();
  const path = argv.d;
  const containized = argv.c;

  const vals: string[] = argv._;
  const command = vals[0].toLowerCase();
  const primary = vals[1];
  const secondary = vals[2];
  const thirdary = vals[3];
  const ext = "ts";
  let basepath;

  if (path) {
    basepath = Util.resolvePath(path);
  } else {
    const base = resolveTSBase();

    if (base) {
      basepath = base;
    } else {
      basepath = process.cwd();
    }
  }

  // tslint:disable-next-line: no-console
  console.log({
    command,
    vals,
  });

  if (command === "init") {
    init({
      scope: primary,
      basepath,
      ext,
      containized,
    });
  } else if (command === "service") {
    service({
      type: primary,
      basepath,
      ext,
      containized,
    });
  } else if (command === "sfc") {
    sfc({
      type: primary,
      event: secondary,
      command: thirdary,
      basepath,
      ext,
      containized,
    });
  }
};
