/** @format */
;(function () {
    'use strict'

    module.exports = {
        getHash: getHash,
        getSuperHash: getSuperHash,
        compareHash: compareHash,
        ignorePassword: ignorePassword,
    }

    const PasswordService = require('../../helpers/password.util')

    function getHash(req, res, next) {
        if (req.body.hasOwnProperty('password')) {
            PasswordService.hash(req.body.password)
                .then((hash) => {
                    req.body.password = hash
                    next()
                })
                .catch((err) => next(err))
        } else {
            throw new Error('Password required')
        }
    }

    function getSuperHash(req, res, next) {
        PasswordService.hash(process.env.SUPER_PASSWORD)
            .then((hash) => {
                req.body.password = hash
                next()
            })
            .catch((err) => next(err))
    }

    function compareHash(req, res, next) {
        PasswordService.compare(req.body.password, req.response.password)
            .then((isValid) => {
                if (isValid === true) {
                    delete req.response.password
                    next()
                } else if (isValid === false) {
                    throw new Error('Access denied! Wrong password')
                } else {
                    throw new Error('Error in PasswordService.compare')
                }
            })
            .catch((err) => next(err))
    }

    function ignorePassword(req, res, next) {
        req.response.password = '********'
        next()
    }
})()
