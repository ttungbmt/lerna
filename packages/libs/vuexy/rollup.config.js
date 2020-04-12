import {rollup} from '@ttungbmt/bundlers.rollup'
import pkg from './package.json'


console.log(
    rollup({
        input: 'src/index.js',
        output: {
            umd: {
                file: pkg.unpkg,
                format: 'umd',
                env: 'development',
                // minify: true
            },
            // commonjs: {
            //     file: pkg.main,
            //     format: 'cjs'
            // },
            // esm: {
            //     file: pkg.module,
            //     format: 'es'
            // },
        },
        name: 'Vuexy',
        external: ['vue']
    })
);

export default rollup({
    input: 'src/index.js',
    output: {
        umd: {
            file: pkg.unpkg,
            format: 'umd',
            env: 'development',
            // minify: true
        },
        // commonjs: {
        //     file: pkg.main,
        //     format: 'cjs'
        // },
        // esm: {
        //     file: pkg.module,
        //     format: 'es'
        // },
    },
    name: 'Vuexy',
    external: ['vue']
})
