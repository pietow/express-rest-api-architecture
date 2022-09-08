/** @format */
;(function () {
    'use strict'

    const express = require('express')
    const router = express.Router()

    const Module = require('./entrant.module')()
    const EntrantMiddleware = Module.EntrantMiddleware
    const PassMiddleware = Module.PassMiddleware

    //REGISTRATION
    router.post(
        '/',
        PassMiddleware.getHash,
        EntrantMiddleware.addEntrant,
        (req, res) => {
            res.status(201).json(req.response)
        },
    )

    //LOGIN
    router.post(
        '/login',
        EntrantMiddleware.getEntrantByEntrantName,
        PassMiddleware.compareHash,
        (req, res) => {
            res.status(200).json(req.response)
        },
    )

    router.put(
        '/:entrantId/check',
        EntrantMiddleware.getEntrantById,
        PassMiddleware.getHash,
        EntrantMiddleware.modifyEntrant,
        (req, res) => {
            res.status(201).json(req.response)
        },
    )

    //LIST OF USERS
    router.get('/', EntrantMiddleware.getEntrants, (req, res) => {
        res.status(200).json(req.response)
    })

    //ONE USER
    router.get('/:entrantId', EntrantMiddleware.getEntrantById, (req, res) => {
        res.status(200).json(req.response)
    })

    //MODIFY USER
    router.put(
        '/:entrantId',
        PassMiddleware.ignorePassword,
        EntrantMiddleware.modifyEntrant,
        (req, res) => {
            res.status(200).json(req.response)
        },
    )

    //DELETE USER
    router.delete(
        '/:entrantId',
        EntrantMiddleware.removeEntrant,
        (req, res) => {
            res.status(200).json(req.response)
        },
    )

    module.exports = router
})()
