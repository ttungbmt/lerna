const {resolve} = require('path')

const resolveRoot = relativePath => resolve(__dirname, '../../../../../node_modules/', relativePath)

module.exports = {
    resolveRoot
}