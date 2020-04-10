const {fixHookCall} = require('@ttungbmt/react.scripts')

module.exports = function override(config, env) {
    fixHookCall(config)

    return config;
}