/** @format */
;(function () {
    'use strict'
    console.log('DATABASE:', process.env.DATABASE)
    process.env.DATABASE =
        process.env.NODE_ENV === 'testing'
            ? 'piet_testing'
            : process.env.DATABASE
    console.log('DATABASE:', process.env.DATABASE)

    const connectionString = `mongodb+srv://${process.env.DBUSER}:${process.env.PASSWORD}@cluster0.9dfvi.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`

    module.exports = { init: init, connectionString: connectionString }

    const mongoose = require('mongoose')
    require('dotenv').config()

    function init() {
        const options = {
            useNewUrlParser: true,
        }
        mongoose
            .connect(connectionString, options)
            .then((result) => {
                console.log(
                    `MongoDB connection successful. DB: ${process.env.DATABASE}`,
                )
            })
            .catch((err) => {
                console.log(err.message)
                console.log(
                    `MongoDB connection failed to DB: ${process.env.DATABASE}`,
                )
            })
        mongoose.connection.on('connected', () => {
            const initCollections =
                require('../../lib/intCollections.js').initCollections

            const collections = [
                {
                    name: 'users',
                    model: require('../user/user.module')().UserModel,
                    modelName: 'UserModel',
                },
                {
                    name: 'entrants',
                    model: require('../entrant/entrant.module.js')()
                        .EntrantModel,
                    modelName: 'EntrantModel',
                },
            ]

            initCollections(mongoose, collections)
        })
    }
})()
