import commonjs from '@rollup/plugin-commonjs';
import aliasPlugin from 'rollup-plugin-alias';
import postcss from 'rollup-plugin-postcss';
import babel from 'rollup-plugin-babel';
import vue from 'rollup-plugin-vue';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import progress from 'rollup-plugin-progress';
import filesize from 'rollup-plugin-filesize';
import url from '@rollup/plugin-url';
import svgr from '@svgr/rollup';
import json from '@rollup/plugin-json';
import { isString, includes, filter, reject, set, transform } from 'lodash';
import 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import path from 'path';
import { appSrc } from 'react-scripts/config/paths';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import readPkg from 'read-pkg';
import replaceExt from 'replace-ext';

const prod = !process.env.ROLLUP_WATCH;

const pkg = readPkg.sync();

function externalPkg({external} = {}) {
    if (!external) return []

    if (isString(external)) {

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
                    fn = external ? filter : reject;
                ids = ids.concat(Object.keys(pkg.devDependencies), Object.keys(pkg.dependencies));
                opts.external = id => fn(ids, o => includes(external, o)).some(module => module === id);

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

const plugins = {
    svgr,
    json,
    url,
    postcss,
    vue,
    replace,
    resolve,
    babel,
    commonjs,
    progress,
    filesize,
    livereload,
    terser,
};

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

const setIf = (data, condition, path, value) => {
    if (condition) set(data, path, value);
};

function getOuput({name, globals, env, minify, plugins = [], ...opts}) {
    const output = {
        ...opts
    };

    setIf(output, opts.format === 'umd', 'name', name);
    setIf(output, globals, 'output.globals', globals);
    setIf(output, env, 'plugins', [
        ...plugins,
        replace({
            'process.env.NODE_ENV': JSON.stringify(env)
        }),
        minify && terser(),
    ]);

    return output
}

function rollup(configs = {}) {
    const {name, globals, input, output, plugins = [], minify, ...confs} = configs;

    return {
        input,
        output: transform(output, (o, {minify, ...n}) => {
            let extra = {name, globals};
            o.push(getOuput({...n, ...extra}));
            if(minify) o.push(getOuput({...n, minify, file: replaceExt(n.file, '.min.js'), name, globals}));
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

export { getPlugins, plugins, prod, rollup };
//# sourceMappingURL=bundlers.rollup.es.js.map
