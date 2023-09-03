import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from '@rollup/plugin-typescript';
import dts from "rollup-plugin-dts";
import { terser } from "rollup-plugin-terser";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import autoprefixer from 'autoprefixer'
import postcss from "rollup-plugin-postcss";
import tailwindcss from 'tailwindcss';

import {
  default as tailwindConfig
} from './tailwind.config.js'

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
        config: {
          path: "./postcss.config.cjs",
        },
        extensions: [".css"],
        minimize: true,
        inject: {
          insertAt: "top",
        },
        plugins: [tailwindcss(tailwindConfig)],
      }),,
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