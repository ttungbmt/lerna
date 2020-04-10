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