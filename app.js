/** @format */

const createError = require('http-errors')
const express = require('express')
const logger = require('morgan')
require('dotenv').config()
const cors = require('cors')

const MongoDBUtil = require('./modules/mongodb/mongodb.module').MongoDBUtil
const UserController = require('./modules/user/user.module')().UserController
const EntrantController = require('./modules/entrant/entrant.module')().EntrantController

const path = require('path')
const app = express()

app.use(
    logger('tiny', {
        skip: function (req, res) {
            return req.app.get('env') !== 'development'
        },
    }),
)
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//establish connection to MongoDB
MongoDBUtil.init()

app.use('/api/', cors())
app.use('/api/users', UserController)
app.use('/api/entrants', EntrantController)

app.get('/', (req, res) => {
    const pkg = require(path.join(__dirname, 'package.json'))
    res.json({
        name: pkg.name,
        version: pkg.version,
        status: 'up',
    })
})

app.use((req, res, next) => {
    next(createError(404))
})

// error handler
app.use((err, req, res, next) => {
    //provide error only in development
    const error = req.app.get('env') !== 'production' ? err : {}
    //set status header
    res.status(err.status || 500)
    //render error page
    res.json({
        error: error.message,
    })
})

module.exports = app
