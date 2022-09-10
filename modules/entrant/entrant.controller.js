/** @format */
;(function () {
    'use strict'

    const express = require('express')
    const router = express.Router()

    const EntrantModule = require('./entrant.module')()
    const UserModule = require('../user/user.module.js')()
    const EntrantMiddleware = EntrantModule.EntrantMiddleware
    const UserMiddleware = UserModule.UserMiddleware
    const PassMiddleware = UserModule.PassMiddleware

    //CREATE PERSONAL DATA
    router.post('/', EntrantMiddleware.addEntrant, (req, res) => {
        res.status(201).json(req.response)
    })

    //LIST OF ENTRANTS
    router.post(
        '/list',
        UserMiddleware.getUserByUserName,
        PassMiddleware.compareHash,
        EntrantMiddleware.getEntrants,
        (req, res) => {
            res.status(200).json(req.response)
        },
    )

    ////////////////////////////////////////////////////////

    //DELETE ENTRANT
    router.delete(
        '/:entrantId',
        EntrantMiddleware.removeEntrant,
        (req, res) => {
            res.status(200).json(req.response)
        },
    )

    module.exports = router
})()
