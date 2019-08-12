const rollupTypescript = require('rollup-typescript')
const { uglify } = require('rollup-plugin-uglify')
const { minify } = require('uglify-es')
const pkg = require('./package.json')

const isProduction = process.env.NODE_ENV === 'production'
const name = 'reach-router-hash'
const rollupTypescriptPlugin = rollupTypescript({typescript: require('typescript')})

const config = {
    input: 'src/index.ts',
    output: isProduction ? [
        {
            name,
            format: 'umd',
            file: pkg["minified:main"],
            sourcemap: !isProduction,
            globals: {
                'react': 'React',
                '@reach/router': 'ReachRouter',
                'hash-source': 'createHashSource'
            },
        }
    ] : [
        {
            name,
            format: 'umd',
            file: pkg.main,
            sourcemap: !isProduction,
            globals: {
                'react': 'React',
                '@reach/router': 'ReachRouter',
                'hash-source': 'createHashSource'
            },
        },
        {
            name,
            format: 'es',
            file: pkg.module,
            sourcemap: !isProduction
        }
    ],
    external: [
        'react',
        '@reach/router',
        'hash-source',
    ],
    
    plugins: !isProduction ? [
        rollupTypescriptPlugin,
    ] : [
        rollupTypescriptPlugin,
        uglify({}, minify),
    ]
};

module.exports = config;