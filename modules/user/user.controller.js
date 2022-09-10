/** @format */
;(function () {
    'use strict'

    const express = require('express')
    const router = express.Router()

    const Module = require('./user.module')()
    const UserMiddleware = Module.UserMiddleware
    const PassMiddleware = Module.PassMiddleware

    //CREATE SUPER_USER
    router.get(
        `/${process.env.HIDDEN_URL}`,
        PassMiddleware.getSuperHash,
        UserMiddleware.addSuperUser,
        PassMiddleware.ignorePassword,
        (req, res) => {
            res.status(201).json(req.response)
        },
    )

    /////////////////////////////////////////////////////

    //DELETE USER
    router.delete('/:userId', UserMiddleware.removeUser, (req, res) => {
        res.status(200).json(req.response)
    })

    module.exports = router
})()
