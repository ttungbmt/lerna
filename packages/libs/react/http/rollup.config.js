// import  {getPlugins} from '@ttungbmt/bundlers.rollup'
// import pkg from './package.json'
// import nodeResolve from '@rollup/plugin-node-resolve'
// import babel from 'rollup-plugin-babel'
// import commonjs from '@rollup/plugin-commonjs'
// import json from '@rollup/plugin-json'
// import peerDepsExternal from 'rollup-plugin-peer-deps-external';
// import async from 'rollup-plugin-async'
//
// // const plugins = getPlugins({
// //     external: 'all'
// // }).concat([async()])
//
// export default {
//     input: 'src/index.js',
//     output: [
//         {file: pkg.main, format: 'cjs', sourcemap: true},
//         {file: pkg.module, format: 'es', sourcemap: true}
//     ],
//     plugins: [
//         babel({
//             exclude: 'node_modules/**', // only transpile our source code
//             runtimeHelpers: true,
//         }), //Place babel before commonjs plugin.
//         nodeResolve(),
//         commonjs(),
//         peerDepsExternal({
//             includeDependencies: true,
//         }),
//         json(),
//
//     ],
// }

import {getPlugins} from "@ttungbmt/bundlers.rollup";
import pkg from "./package.json";

const plugins = getPlugins({
    external: 'all'
})

export default {
    input: 'src/index.js',
    output: [
        {file: pkg.main, format: 'cjs', sourcemap: true},
        {file: pkg.module, format: 'es', sourcemap: true}
    ],
    plugins,
}