/** @format */
;(function () {
    'use strict'
    const mongoose = require('mongoose')
    const Schema = mongoose.Schema
    const EMAILREGEX = require('../../helpers/email.regex').EMAILREGEX()

    const opts = {
        timestamps: true,
    }

    const EntrantSchema = new Schema(
        {
            //FOR DEBUGGING
            /* _id: { */
            /*     type: Schema.Types.ObjectId, */
            /*     default: '624ae069a91bf7b8deb12743', */
            /* }, */
            fname: { type: String, maxLength: 30 },
            lname: { type: String, maxLength: 30 },
            age: { type: Number },
            phone: { type: String, maxLength: 30 },
            address: { type: String, maxLength: 30 },
            entrantname: { type: String },
            email: {
                type: String,
                unique: true,
                required: true,
                match: EMAILREGEX,
            },
            circus_project: { type: String, maxLength: 30 },
            food: { type: String, maxLength: 30 },
            open_stage: { type: Boolean },
            workshop: { type: Boolean },
            attendance_fee: { type: Number },
        },
        opts,
    )

    module.exports = mongoose.model('Entrant', EntrantSchema)
})()
