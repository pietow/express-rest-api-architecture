/** @format */

'use strict'

const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

const expect = chai.expect
const request = chai.request

const app = require('../../app')

const Fixtures = require('../fixtures/fixtures')
const entrantFixture = Fixtures.entrantFixture

const baseUri = '/api/entrants'
const PasswordService = require('../../helpers/password.util')

const testData = {
    existingentrant: {},
}

app.set('env', 'testing')

//TODO: Add fixture for entrant
describe('entrantController', function () {
    describe(`POST ${baseUri}`, function () {
        it('should add new entrant', function (done) {
            request(app)
                .post(baseUri)
                .send(entrantFixture.newentrant)
                .end(async (err, res) => {
                    const bool = await PasswordService.compare(
                        'password',
                        res.body.password,
                    )
                    expect(bool).to.be.true
                    expect(res.status).to.equal(201)
                    expect(res.body).to.not.equal({})
                    expect(res.body._id).to.not.equal(undefined)
                    expect(res.body.fname).to.equal(
                        entrantFixture.createdentrant.fname,
                    )
                    testData.existingentrant = res.body

                    done()
                })
        })
    })

    describe(`POST ${baseUri}/login`, function () {
        it('should login registered entrant', function (done) {
            request(app)
                .post(`${baseUri}/login`)
                .send({ entrantname: 'piet', password: 'password' })
                .end((err, res) => {
                    expect(res.status).to.equal(200)

                    done()
                })
        })
    })

    describe(`GET ${baseUri}`, function () {
        it('should get all entrants', function (done) {
            request(app)
                .get(baseUri)
                .end(function (err, res) {
                    expect(res.status).to.equal(200)
                    expect(res.body).to.not.equal(undefined)
                    expect(res.body).to.be.a('array')
                    expect(res.body.length).to.not.equal(0)

                    done()
                })
        })
    })

    describe(`GET ${baseUri}/${testData.existingentrant._id}`, function () {
        it('should get entrant by id', function (done) {
            request(app)
                .get(`${baseUri}/${testData.existingentrant._id}`)
                .end(function (err, res) {
                    expect(res.status).to.equal(200)
                    expect(res.body).to.not.equal(undefined)
                    expect(res.body).to.be.a('object')

                    done()
                })
        })
    })

    describe(`PUT ${baseUri}/${testData.existingentrant._id}`, function () {
        it('should modify entrant by id', function (done) {
            request(app)
                .put(`${baseUri}/${testData.existingentrant._id}`)
                .send({ entrantname: 'otto', city: 'Bielefeld' })
                .end(function (err, res) {
                    expect(res.status).to.equal(200)
                    expect(res.body).to.not.equal({})
                    expect(res.body._id).to.not.equal(undefined)
                    expect(res.body.fname).to.equal(
                        entrantFixture.createdentrant.fname,
                    )
                    expect(res.body.entrantname).to.equal('otto')

                    done()
                })
        })
    })

    describe(`DELETE ${baseUri}/${testData.existingentrant._id}`, function () {
        it('should delete entrant by id', function (done) {
            request(app)
                .delete(`${baseUri}/${testData.existingentrant._id}`)
                .end(function (err, res) {
                    expect(res.status).to.equal(200)
                    expect(res.body).to.not.equal(undefined)
                    expect(res.body).to.be.a('object')
                    expect(res.body._id).to.equal(testData.existingentrant._id)

                    done()
                })
        })
    })
})
