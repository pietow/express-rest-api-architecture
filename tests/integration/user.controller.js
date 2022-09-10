/** @format */

'use strict'

const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

const expect = chai.expect
const request = chai.request

const app = require('../../app')

const Fixtures = require('../fixtures/fixtures')
const UserFixture = Fixtures.UserFixture

const baseUri = '/api/users'
const PasswordService = require('../../helpers/password.util')

const testData = {
    existingUser: {},
}

app.set('env', 'testing')
console.log(process.env.HIDDEN_URL)

describe('UserController', function () {
    describe(`POST ${baseUri}/${process.env.HIDDEN_URL}`, function () {
        it('should add new user', function (done) {
            request(app)
                .get(`${baseUri}/${process.env.HIDDEN_URL}`)
                .send()
                .end(async (err, res) => {
                    expect(res.status).to.equal(201)
                    expect(res.body).to.not.equal({})
                    expect(res.body._id).to.not.equal(undefined)
                    testData.existingUser = res.body

                    done()
                })
        })
    })

    /* describe(`DELETE ${baseUri}/${testData.existingUser._id}`, function () { */
    /*     it('should delete user by id', function (done) { */
    /*         request(app) */
    /*             .delete(`${baseUri}/${testData.existingUser._id}`) */
    /*             .end(function (err, res) { */
    /*                 expect(res.status).to.equal(200) */
    /*                 expect(res.body).to.not.equal(undefined) */
    /*                 expect(res.body).to.be.a('object') */
    /*                 expect(res.body._id).to.equal(testData.existingUser._id) */

    /*                 done() */
    /*             }) */
    /*     }) */
    /* }) */
})
