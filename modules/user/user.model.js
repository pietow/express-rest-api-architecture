/** @format */
;(function () {
    'use strict'
    const mongoose = require('mongoose')
    const Schema = mongoose.Schema

    const opts = {
        timestamps: true,
    }

    const UserSchema = new Schema(
        {
            //FOR DEBUGGING
            /* _id: { */
            /*     type: Schema.Types.ObjectId, */
            /*     default: '624ae069a91bf7b8deb12743', */
            /* }, */
            username: { type: String, unique: true },
            password: { type: String, required: true },
        },
        opts,
    )

    module.exports = mongoose.model('User', UserSchema)
})()
