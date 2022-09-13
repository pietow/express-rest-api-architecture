/** @format */
;(function () {
    'use strict'

    module.exports = { initCollections }
    function initCollections(mongoose, collections) {
        collections.map((coll) => {
            mongoose.connection.db
                .collection(coll.name)
                .count()
                .then((count) => {
                    if (count === 0) {
                        const Model = coll.model
                        Model.init()
                        console.log(`${coll.modelName} initialized!`)
                    }
                })
                .catch(console.log)
        })
    }
})()
