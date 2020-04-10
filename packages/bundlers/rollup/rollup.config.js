import pkg from './package.json'

export default {
    input: 'src/index.js',
    output: [
        {file: pkg.main, format: 'cjs'},
        {file: pkg.module, format: 'es', sourcemap: true}
    ],
    external: Object.keys(pkg.dependencies).concat(['path']),
}