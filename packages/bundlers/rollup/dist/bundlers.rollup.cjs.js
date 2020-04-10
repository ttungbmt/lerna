'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var commonjs = _interopDefault(require('@rollup/plugin-commonjs'));
var aliasPlugin = _interopDefault(require('rollup-plugin-alias'));
var postcss = _interopDefault(require('rollup-plugin-postcss'));
var babel = _interopDefault(require('rollup-plugin-babel'));
var vue = _interopDefault(require('rollup-plugin-vue'));
var resolve = _interopDefault(require('@rollup/plugin-node-resolve'));
var replace = _interopDefault(require('@rollup/plugin-replace'));
var progress = _interopDefault(require('rollup-plugin-progress'));
var filesize = _interopDefault(require('rollup-plugin-filesize'));
var url = _interopDefault(require('@rollup/plugin-url'));
var svgr = _interopDefault(require('@svgr/rollup'));
var json = _interopDefault(require('@rollup/plugin-json'));
var lodash = require('lodash');
require('rollup-plugin-serve');
var livereload = _interopDefault(require('rollup-plugin-livereload'));
var rollupPluginTerser = require('rollup-plugin-terser');
var path = _interopDefault(require('path'));
var paths = require('react-scripts/config/paths');
var peerDepsExternal = _interopDefault(require('rollup-plugin-peer-deps-external'));
var readPkg = _interopDefault(require('read-pkg'));

const prod = !process.env.ROLLUP_WATCH;

const pkg = readPkg.sync();

function externalPkg({external} = {}) {
    if (!external) return []

    if (lodash.isString(external)) {

        if (external === 'all') {
            return [
                peerDepsExternal({
                    includeDependencies: true,
                }),
            ]
        }
    }

    return [
        (() => ({
            name: 'external',
            options: opts => {
                let ids = [],
                    fn = external ? lodash.filter : lodash.reject;
                ids = ids.concat(Object.keys(pkg.devDependencies), Object.keys(pkg.dependencies));
                opts.external = id => fn(ids, o => lodash.includes(external, o)).some(module => module === id);

                return opts
            }
        }))(),
        peerDepsExternal({
            includeDependencies: false,
        }),
    ]
}

/*
@rollup/plugin-legacy
@rollup/plugin-multi-entry
@rollup/plugin-node-resolve
*/

function getPlugins(params = {}) {
    const {external, alias, minify, hot} = params;

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
                '@': path.resolve(paths.appSrc),
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
        minify && rollupPluginTerser.terser(),
    ]
}

exports.getPlugins = getPlugins;
exports.prod = prod;
