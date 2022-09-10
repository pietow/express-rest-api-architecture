/** @format */

;(function () {
    'use strict'

    module.exports = {
        addUser: addUser,
        addSuperUser: addSuperUser,
        getUsers: getUsers,
        getUserById: getUserById,
        getUserByUserName: getUserByUserName,
        modifyUser: modifyUser,
        removeUser: removeUser,
    }

    const UserService = require('./user.module')().UserService
    const MailerHelper = require('../../helpers/mailer.helper')

    function addUser(req, res, next) {
        UserService.createUser(req.body).then(success).catch(failure)

        function success(data) {
            req.response = data
            next()
        }

        function failure(err) {
            next(err)
        }
    }

    function addSuperUser(req, res, next) {
        UserService.upsertSuperUser(req.body)
            .then((data) => {
                req.response = data
                next()
            })
            .catch((err) => next(err))
    }

    function getUsers(req, res, next) {
        UserService.fetchUsers()
            .then((data) => {
                req.response = data
                if (!Array.isArray(data))
                    throw Error(
                        'in UserMiddleware: should return an Array of users',
                    )
                next()
            })
            .catch((err) => {
                next(err)
            })
    }

    function getUserById(req, res, next) {
        UserService.fetchUserById(req.params.userId)
            .then((data) => {
                req.response = data
                next()
            })
            .catch((err) => next(err))
    }

    function getUserByUserName(req, res, next) {
        UserService.fetchUserByUserName(req.body)
            .then((data) => {
                req.response = data
                next()
            })
            .catch((err) => next(err))
    }

    function modifyUser(req, res, next) {
        UserService.updateUser(req.params.userId, req.body)
            .then((data) => {
                req.response = data
                next()
            })
            .catch((err) => next(err))
    }

    function removeUser(req, res, next) {
        UserService.deleteUser(req.params.userId)
            .then((data) => {
                req.response = data
                next()
            })
            .catch((err) => next(err))
    }
})()
