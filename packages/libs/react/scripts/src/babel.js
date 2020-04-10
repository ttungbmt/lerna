const {addBabelPlugins} = require('customize-cra');

const babelPlugins = [
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-proposal-class-properties',
    // 'react-hot-loader/babel'
]

const addDefaultBabelPlugins = (plugins = []) => config => addBabelPlugins(...babelPlugins.concat(plugins)).map(p => p(config))

module.exports = {
    addDefaultBabelPlugins,
    addBabelPlugins: (plugins = []) => config => addBabelPlugins(plugins).map(p => p(config))
}