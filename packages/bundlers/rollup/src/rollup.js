import replace from '@rollup/plugin-replace'
import replaceExt from 'replace-ext'

import {transform} from 'lodash'
import {setIf} from './utils'
import svgr from "@svgr/rollup";
import commonjs from '@rollup/plugin-commonjs';
import aliasPlugin from 'rollup-plugin-alias';
import postcss from 'rollup-plugin-postcss'
import babel from 'rollup-plugin-babel';
import vue from 'rollup-plugin-vue'
import resolve from '@rollup/plugin-node-resolve';
import progress from 'rollup-plugin-progress';
import filesize from 'rollup-plugin-filesize';
import url from '@rollup/plugin-url';
import json from '@rollup/plugin-json';
import {terser} from "rollup-plugin-terser";

function getOuput({name, globals, env, minify, plugins = [], ...opts}) {
    const output = {
        ...opts
    }

    setIf(output, opts.format === 'umd', 'name', name)
    setIf(output, globals, 'output.globals', globals)
    setIf(output, env, 'plugins', [
        ...plugins,
        replace({
            'process.env.NODE_ENV': JSON.stringify(env)
        }),
        minify && terser(),
    ])

    return output
}

function rollup(configs = {}) {
    const {name, globals, input, output, plugins = [], minify, ...confs} = configs

    return {
        input,
        output: transform(output, (o, {minify, ...n}) => {
            let extra = {name, globals}
            o.push(getOuput({...n, ...extra}))
            if(minify) o.push(getOuput({...n, minify, file: replaceExt(n.file, '.min.js'), name, globals}))
        }, []),
        plugins: [
            svgr(),
            json(),
            url(),
            postcss({
                extract: false,
                plugins: [],
                minimize: true,
                sourceMap: true,
            }),
            vue({
                css: false
            }),
            resolve(),
            babel({
                presets: [
                    ['@babel/preset-env', {modules: false}],
                    '@babel/preset-react',
                    '@babel/preset-flow',
                ],
                plugins: [
                    '@babel/plugin-proposal-export-default-from',
                    '@babel/plugin-proposal-export-namespace-from',
                    '@babel/plugin-proposal-throw-expressions',
                    '@babel/plugin-proposal-class-properties',
                    '@babel/plugin-syntax-dynamic-import',
                    '@babel/plugin-proposal-object-rest-spread',
                    '@babel/plugin-proposal-optional-chaining',
                    ['@babel/plugin-proposal-decorators', {'legacy': true}],
                ],
                exclude: 'node_modules/**',
                runtimeHelpers: true,
            }),
            commonjs(),
            ...plugins,
            progress(),
            filesize(),
            minify && terser(),
        ].filter(v => v),
        ...confs
    }
}



 export default rollup