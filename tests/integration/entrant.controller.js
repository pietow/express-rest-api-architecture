/** @format */

'use strict'

const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

const expect = chai.expect
const request = chai.request

const app = require('../../app')

const Fixtures = require('../fixtures/fixtures')
const entrantFixture = Fixtures.EntrantFixture

const baseUri = '/api/entrants'
const PasswordService = require('../../helpers/password.util')

let ID = 'THIS VALUE SHOULD BE REPLACED'

describe('entrantController', function () {
    describe(`POST ${baseUri}`, function () {
        it('should add new entrant', function (done) {
            request(app)
                .post(baseUri)
                .send(entrantFixture.newEntrant)
                .end(async (err, res) => {
                    res.body.error ? expect(res.body).to.equal({}) : null
                    expect(res.body).to.not.equal({})
                    expect(res.body._id).to.not.equal(undefined)
                    expect(res.status).to.equal(201)
                    expect(res.body.fname).to.equal(
                        entrantFixture.createdEntrant.fname,
                    )
                    ID = res.body._id


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

    describe(`GET ${baseUri}/RANDOM_ID`, function () {
        it('should get entrant by id', function (done) {
            request(app)
                .get(`${baseUri}/${ID}`)
                .end(function (err, res) {
                    if(res.body.error) throw new Error(JSON.stringify(res.body.error))
                    expect(res.status).to.equal(200)
                    expect(res.body).to.not.equal(undefined)
                    expect(res.body).to.be.a('object')

                    done()
                })
        })
    })

    describe(`PUT ${baseUri}/RANDOM_ID`, function () {
        it('should modify entrant by id', function (done) {
            request(app)
                .put(`${baseUri}/${ID}`)
                .send({ entrantname: 'otto', city: 'Bielefeld' })
                .end(function (err, res) {
                    res.body.error ? expect(res.body).to.equal({}) : null
                    expect(res.status).to.equal(200)
                    expect(res.body).to.not.equal({})
                    expect(res.body._id).to.not.equal(undefined)
                    expect(res.body.fname).to.equal(
                        entrantFixture.createdEntrant.fname,
                    )
                    expect(res.body.entrantname).to.equal('otto')

                    done()
                })
        })
    })

    describe(`DELETE ${baseUri}/RANDOM_ID`, function () {
        it('should delete entrant by id', function (done) {
            request(app)
                .delete(`${baseUri}/${ID}`)
                .end(function (err, res) {
                    res.body.error ? expect(res.body).to.equal({}) : null
                    expect(res.status).to.equal(200)
                    expect(res.body).to.not.equal(undefined)
                    expect(res.body).to.be.a('object')
                    expect(res.body._id).to.equal(ID)

                    done()
                })
        })
    })
})


