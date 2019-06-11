const sinon = require('sinon');

const mongoose = require('mongoose')
mongoose.set('debug', true)
require('sinon-mongoose')

const app = require('../../index.js')

const agent = require('supertest').agent(app);
const expect = require('chai').expect;

const Account = require('../../models/accounts.js')

var accountMock = sinon.mock(Account)

beforeEach(() => {
	console.log("beforeEach")
	accountMock.restore(); 
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

		agent
		.get('/accounts')
		.end((err,res) => {
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