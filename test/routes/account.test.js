// Mongoose and mocking requests
const sinon = require('sinon');

const mongoose = require('mongoose')
mongoose.set('debug', true)
require('sinon-mongoose')

// initialize the app and models
const app = require('../../index.js')

// sending requests
const agent = require('supertest').agent(app);
// validating results
const expect = require('chai').expect;

// get the model
const Account = require('../../models/accounts.js')

var accountMock = sinon.mock(Account)

beforeEach(() => {
	console.log("beforeEach")
	accountMock.restore(); // Unwraps the spy
});

afterEach( () => {
	console.log("afterEach")
	accountMock.verify();
});

describe('Testing', () => {
	const request = {
    "account": {
      "name": "Marcus"
    }
	}
	
  const expected = {
    "account": {
      "name": "Marcus"
    },
    "_id": "5cff75e89e816de11ba890e1",
    "__v": 0
  }


describe('account.get', () => {

  it('Should return our accounts', (done) => {
    
    accountMock
			.expects('find')
			.chain('exec')
			.resolves([expected]);

			// When (someting happens)
			agent
			.get('/accounts')
			.end((err,res) => {
			// Then (something should happen)
				expect(res.status).to.equal(200);
				expect(res.body).to.eql([expected]);
				done();
    })
	})
	
	it('Should get a user by name', (done) => {
		accountMock
		.expects('findOne')
		.chain('exec')
		.resolves(expected);
		agent
		.get('/accounts?name=Marcus')
		.end((err, res) => {
			expect(res.status).to.equal(200);
			expect(res.body).to.eql(expected);
			done();
		})

	})
});
});