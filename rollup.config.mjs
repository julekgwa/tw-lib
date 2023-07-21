import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from '@rollup/plugin-typescript';
import dts from "rollup-plugin-dts";
import { terser } from "rollup-plugin-terser";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import autoprefixer from 'autoprefixer'
import postcss from "rollup-plugin-postcss-modules";

export default [
  {
    input: "src/index.ts",
    output: [
      {
        // preserveModules: true,
        file: 'dist/index.js',
        format: "cjs",
        sourcemap: true,
      },
      {
        // preserveModules: true,
        file: 'dist/index.es.js',
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      postcss({
        extract: true,  // extracts to `${basename(dest)}.css`
        // plugins: [autoprefixer()],
        writeDefinitions: true,
        // modules: { ... }
      }),
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
      terser(),
    ],
    external: ["react", "react-dom"],
  },
  {
    input: "src/index.ts",
    output: [{ file: "dist/types.d.ts", format: "es" }],
    plugins: [dts()],
  },
];