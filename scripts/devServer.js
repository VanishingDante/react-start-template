const express = require('express')
const detect = require('detect-port')
const open = require('react-dev-utils/openBrowser')
const chalk = require('chalk')
const createWebpackMiddleware = require('webpack-dev-middleware')
const createWebpackHotMiddleware = require('webpack-hot-middleware')
const setupCompiler = require('./setupCompiler')
const serverConfig = require('../config/webpack.config.server')
const paths = require('../config/paths')
const path = require('path')

const app = express()

app.use(express.static(paths.build))

app.use((req, res, next) => {
    if (/service-worker/.test(req.url))
        res.set('Service-Worker-Allowed', '/')
    next()
})

const defaultPort = parseInt(process.env.PORT, 10) || 9000
detect(defaultPort).then(port => {
    console.log(chalk.magenta('Starting the development server...'))

    const compiler = setupCompiler(port)
    const webpackDevMiddleware = createWebpackMiddleware(compiler, serverConfig)
    const webpackHotMiddleware = createWebpackHotMiddleware(compiler)

    app.use(webpackDevMiddleware)
    app.use(webpackHotMiddleware)

    app.use((req, res, next) => {
    // res.sendFile(`${__dirname}/index.html`)
    // Since index.html is dynamicly generated by html-webpack-plugin
    // we cannot access it from the local file system
    // just rewrite the request and call webpackDevMiddleware again
        req.url = path.resolve(paths.servedPath, 'index.html')
        webpackDevMiddleware(req, res, next)
    })

    app.listen(port, () => {
        console.log(`App listening on http://localhost:${port}`)
        open(`http://localhost:${port}`)
    })
})

