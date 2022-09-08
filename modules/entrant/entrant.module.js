/** @format */
;(function () {
    'use strict'

    module.exports = init
    function init() {
        return {
            EntrantController: require('./entrant.controller'),
            EntrantMiddleware: require('./entrant.middleware'),
            PassMiddleware: require('./pass.middleware'),
            EntrantService: require('./entrant.service'),
            EntrantModel: require('./entrant.model'),
        }
    }
})()
