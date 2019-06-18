const sinon = require('sinon');

const mongoose = require('mongoose')
mongoose.set('debug', true)
require('sinon-mongoose')

const app = require('../../index.js')

const agent = require('supertest').agent(app);
const expect = require('chai').expect;

const User = require('../../models/User.js')
const Counter = require('../../models/counter.js')

var userMock = sinon.mock(User)
var counterMock = sinon.mock(Counter)

beforeEach(() => {
	console.log("beforeEach")
	userMock.restore(); 
	counterMock.restore();
});

afterEach( () => {
	console.log("afterEach")
	userMock.verify();
	counterMock.verify();
});

describe('Testing counter', () => {
	const request = {
		"count": 1,
		"id": 2
	}

	const expected = {
		"count": 1,
		"id": 2
	}

	const putRequest = {
		"count": 1,
		"id": 2
	}

	const putExpected = {
		"count": 1,
		"id": 2
	}

	it('Should return our counter', (done) => {
    
    counterMock
		.expects('find')
		.chain('exec')
		.resolves([expected]);

		agent
		.get('/counter')
		.end((err,res) => {
			console.log(res.body)
			expect(res.status).to.equal(200);
			expect(res.body).to.eql([expected]);
			done();
    })
	})

	it('Should return a specific counter', (done) => {
    
    counterMock
		.expects('findOne')
		.chain('exec')
		.resolves([expected]);

		agent
		.get('/counter/2')
		.end((err,res) => {
			console.log(res.body)
			expect(res.status).to.equal(200);
			expect(res.body).to.eql([expected]);
			done();
    })
	})

	it('Should return a specific counter', (done) => {
    
    counterMock
		.expects('findOneAndUpdate')
		.withArgs({id:2})
		.chain('exec')
		.resolves({ n: 1,
			nModified: 0,
			upserted: [ { id: 2 } ],
			ok: 1 });

		agent
		.put('/counter/2')
		.send(putRequest)
		.end((err,res) => {
			expect(res.status).to.equal(201);
			done();
    })
	})

})

describe('Testing', () => {
	const request = {
		"username": "oskar",
		"password": "ads",
			"likedPlayers": [{
				"playerId": 6463,
				"name": "Kalle",
			}]
    }

	
  const expected = {
    "username": "oskar",
		"password": "ads",
			"likedPlayers": [{
				"playerId": 6463,
				"name": "Kalle",
			}],
    "_id": "5cff75e89e816de11ba890e1",
    "__v": 0
	}


describe('account.getlikes', () => {

  it('Should return our accounts', (done) => {
    
    userMock
		.expects('findOne')
		.chain('exec')
		.resolves([expected]);

		agent
		.get('/login/oskar')
		.end((err,res) => {
			console.log(res.body)
			expect(res.status).to.equal(200);
			expect(res.body).to.eql([expected]);
			done();
    })
	})
	
});
});