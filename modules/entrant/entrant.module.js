/** @format */
;(function () {
    'use strict'

    module.exports = init
    function init() {
        return {
            EntrantController: require('./entrant.controller'),
            EntrantMiddleware: require('./entrant.middleware'),
            EntrantService: require('./entrant.service'),
            EntrantModel: require('./entrant.model'),
        }
    }
})()
