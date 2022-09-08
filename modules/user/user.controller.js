/** @format */
;(function () {
    'use strict'

    const express = require('express')
    const router = express.Router()

    const Module = require('./user.module')()
    const UserMiddleware = Module.UserMiddleware
    const PassMiddleware = Module.PassMiddleware

    //REGISTRATION
    router.post(
        '/',
        PassMiddleware.getHash,
        UserMiddleware.addUser,
        (req, res) => {
            res.status(201).json(req.response)
        },
    )

    //LOGIN
    router.post(
        '/login',
        UserMiddleware.getUserByUserName,
        PassMiddleware.compareHash,
        (req, res) => {
            res.status(200).json(req.response)
        },
    )

    router.put(
        '/:userId/check',
        UserMiddleware.getUserById,
        PassMiddleware.getHash,
        UserMiddleware.modifyUser,
        (req, res) => {
            res.status(201).json(req.response)
        },
    )

    //LIST OF USERS
    router.get('/', UserMiddleware.getUsers, (req, res) => {
        res.status(200).json(req.response)
    })

    //ONE USER
    router.get('/:userId', UserMiddleware.getUserById, (req, res) => {
        res.status(200).json(req.response)
    })

    //MODIFY USER
    router.put(
        '/:userId',
        PassMiddleware.ignorePassword,
        UserMiddleware.modifyUser,
        (req, res) => {
            res.status(200).json(req.response)
        },
    )

    //DELETE USER
    router.delete('/:userId', UserMiddleware.removeUser, (req, res) => {
        res.status(200).json(req.response)
    })

    module.exports = router
})()
