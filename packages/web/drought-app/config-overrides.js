const {setDefaultCra, fixHookCall, addWebpackExternals} = require('@ttungbmt/react.scripts')

const babelPlugins = [
    'emotion',
]

const babelPresets = [
    '@emotion/babel-preset-css-prop'
]

module.exports = function override(config, env) {
    fixHookCall(config)
    setDefaultCra()(config)

    addWebpackExternals({
        'react': 'React',
        'react-dom': 'ReactDOM',
    })(config)

    return config;
}