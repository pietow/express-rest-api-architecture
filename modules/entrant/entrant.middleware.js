/** @format */

;(function () {
    'use strict'

    module.exports = {
        addEntrant: addEntrant,
        getEntrants: getEntrants,
        getEntrantById: getEntrantById,
        getEntrantByEntrantName: getEntrantByEntrantName,
        modifyEntrant: modifyEntrant,
        removeEntrant: removeEntrant,
    }

    const EntrantService = require('./entrant.module')().EntrantService

    function addEntrant(req, res, next) {
        EntrantService.createEntrant(req.body).then(success).catch(failure)

        function success(data) {
            req.response = data
            next()
        }

        function failure(err) {
            next(err)
        }
    }

    function getEntrants(req, res, next) {
        EntrantService.fetchEntrants()
            .then((data) => {
                req.response = data
                if (!Array.isArray(data))
                    throw Error(
                        'in EntrantMiddleware.getEntrants: should return an Array of entrants',
                    )
                next()
            })
            .catch((err) => {
                next(err)
            })
    }

    function getEntrantById(req, res, next) {
        EntrantService.fetchEntrantById(req.params.entrantId)
            .then((data) => {
                req.response = data
                next()
            })
            .catch((err) => next(err))
    }

    function getEntrantByEntrantName(req, res, next) {
        EntrantService.fetchEntrantByEntrantName(req.body)
            .then((data) => {
                req.response = data
                next()
            })
            .catch((err) => next(err))
    }

    function modifyEntrant(req, res, next) {
        EntrantService.updateEntrant(req.params.entrantId, req.body)
            .then((data) => {
                req.response = data
                next()
            })
            .catch((err) => next(err))
    }

    function removeEntrant(req, res, next) {
        EntrantService.deleteEntrant(req.params.entrantId)
            .then((data) => {
                req.response = data
                next()
            })
            .catch((err) => next(err))
    }
})()
