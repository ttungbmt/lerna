import commonjs from '@rollup/plugin-commonjs';
import aliasPlugin from 'rollup-plugin-alias';
import postcss from 'rollup-plugin-postcss'
import babel from 'rollup-plugin-babel';
import vue from 'rollup-plugin-vue'
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace'
import progress from 'rollup-plugin-progress';
import filesize from 'rollup-plugin-filesize';
import url from '@rollup/plugin-url';
import svgr from '@svgr/rollup'
import json from '@rollup/plugin-json';
import { reject, includes, isString, filter } from 'lodash'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import { terser } from 'rollup-plugin-terser';
import path from 'path'
import { appSrc } from 'react-scripts/config/paths'

import externalPkg from './externalPkg'
import { prod } from './env'

/*
@rollup/plugin-legacy
@rollup/plugin-multi-entry
@rollup/plugin-node-resolve
*/

export default function getPlugins(params = {}) {
    const {external, alias, minify, hot} = params

    return [
        ...externalPkg({external}),
        svgr(),
        json(),
        url(),
        postcss({
            extract: true,
            plugins: [],
            minimize: true,
            sourceMap: true,
        }),
        vue({
            css: false
        }),
        replace({
            'process.env.NODE_ENV': prod
                ? JSON.stringify('production')
                : JSON.stringify('development'),
        }),
        resolve({
            browser: true,
        }),
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
        aliasPlugin({
            entries: {
                '@': path.resolve(appSrc),
                ...alias,
            }
        }),
        progress(),
        filesize(),
        hot && livereload('dist'),
        // serve({
        //     open: true,
        //     contentBase: ['dist'],
        //     port: 5000,
        // }),
        minify && terser(),
    ]
}
