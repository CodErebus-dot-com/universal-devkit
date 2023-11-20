import type { Options } from "tsup";

export const tsup: Options = {
  clean: true,
  dts: false,
  minify: true,
  bundle: true,
  skipNodeModulesBundle: true,
  entryPoints: ["bin/index.ts"],
  target: "es2020",
  treeshake: true,
  format: ["esm"],
  outDir: "dist",
  sourcemap: false,
};
