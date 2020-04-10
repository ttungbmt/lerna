import { filter, includes, isString, reject } from 'lodash'
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import readPkg from 'read-pkg'

const pkg = readPkg.sync()

export default function externalPkg({external} = {}) {
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
                    fn = external ? filter : reject
                ids = ids.concat(Object.keys(pkg.devDependencies), Object.keys(pkg.dependencies))
                opts.external = id => fn(ids, o => includes(external, o)).some(module => module === id)

                return opts
            }
        }))(),
        peerDepsExternal({
            includeDependencies: false,
        }),
    ]
}