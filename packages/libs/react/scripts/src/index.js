const {addWebpackExternals, addWebpackAlias, addWebpackPlugin, addBabelPresets, addBabelPlugins} = require('customize-cra')
const {resolveRoot, resolve} = require('./resolve')
const babelFns = require('./babel')

const fixHookCall = (config) => addWebpackAlias({
    'react': resolveRoot('react'),
    'react-dom': resolveRoot('react-dom'),
    'react-hot-loader': resolveRoot('react-hot-loader'),
})(config)

const setDefaultCra = (options = {}) => config => {
    const babelPresets = [
        '@emotion/babel-preset-css-prop'
    ]

    babelFns.addDefaultBabelPlugins()(config)
    addBabelPresets(...babelPresets).map(p => p(config))
}

module.exports = {
    resolve,
    resolveRoot,
    fixHookCall,
    setDefaultCra,
    ...babelFns,
    addWebpackExternals, addWebpackAlias, addWebpackPlugin, addBabelPresets
}