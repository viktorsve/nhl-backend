const mongoose = require('mongoose')
mongoose.set('debug', true)
require('sinon-mongoose');
const sinon = require('sinon');

const app = require('./index.js');
const request = require('supertest');

const expect = require('chai').expect;

const Student = require('./models/accounts');
let studentMock = sinon.mock(Student);

beforeEach(() => {
  studentMock.restore();
})

afterEach(() => {
  studentMock.verify();
})

describe('User integration tests', () => {
  const expected = {
    "account": {
      "name": "Viktor"
    },
    "_id": '5cecf112a66bc43a217dfda3',
    "__v": 0,
  }
  describe('GET /students', () => {
    it('Get all students', (done) => {
      studentMock
        .expects('find')
        .chain('exec')
        .resolves([expected]);

      request(app)
        .get('/accounts')
        .end((err, res) => {
          expect(res.body).to.eql([expected]);
          done();
        });
    });
});
})
