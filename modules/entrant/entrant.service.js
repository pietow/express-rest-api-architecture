/** @format */
;(function () {
    'use strict'

    module.exports = {
        createEntrant: createEntrant,
        fetchEntrants: fetchEntrants,
        fetchEntrantById: fetchEntrantById,
        fetchEntrantByEntrantName: fetchEntrantByEntrantName,
        updateEntrant: updateEntrant,
        deleteEntrant: deleteEntrant,
    }

    const EntrantModel = require('./entrant.module')().EntrantModel

    function fetchEntrants() {
        return EntrantModel.find({}).exec()
    }

    function createEntrant(entrant) {
        return EntrantModel.create(entrant)
    }

    function fetchEntrantById(entrantId) {
        return EntrantModel.findById(entrantId).exec()
    }

    function fetchEntrantByEntrantName(entrantname) {
        return EntrantModel.findOne({ entrantname: username.username }).lean()
    }

    function updateEntrant(entrantId, user) {
        return EntrantModel.findByIdAndUpdate(entrantId, user, {
            runValidators: true,
            new: true,
        }).exec()
    }

    function deleteEntrant(entrantId) {
        return EntrantModel.findByIdAndRemove(entrantId).exec()
    }
})()
