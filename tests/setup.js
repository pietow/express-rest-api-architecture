/** @format */

const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')

let mongo

exports.mochaHooks = {
    async beforeAll() {
        mongo = await MongoMemoryServer.create()
        const uri = mongo.getUri()

        process.env.MONGODB_URI = uri

        await mongoose.connect(uri)
    },

    async afterAll() {
        await mongoose.connection.dropDatabase()
        await mongoose.connection.close()
        await mongo.stop()
    },
}
