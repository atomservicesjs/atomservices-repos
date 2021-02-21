import { Util } from "archappenv";
import * as FS from "fs";
import * as Path from "path";

export const resolveTSBase = () => {
  const paths = Util.findFilePaths("tsconfig.json");

  if (paths.length) {
    const fp = paths[0];
    const data = require(fp);

    if (data && data.compilerOptions && data.compilerOptions.rootDir) {
      const dir = data.compilerOptions.rootDir;
      const base = Path.resolve(Util.packagePath(), dir);

      if (FS.existsSync(base)) {
        return base;
      }
    }
  }

  return undefined;
};
