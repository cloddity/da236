const chai = require('chai');  
const chaiHttp = require('chai-http');  
const app = require('../app'); 
const mongoose = require('mongoose');

chai.use(chaiHttp);
const { expect } = chai;

describe('Auth API', () => {
  before((done) => {
    mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/hw7', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }, done);
  });

  after((done) => {
    mongoose.connection.close(done);
  });

  describe('POST /api/auth/register', () => {
    it('should register a new user', (done) => {
      chai.request(app)
        .post('/api/auth/register')
        .send({
          username: 'testuser',
          email: 'testuser@example.com',
          password: 'password123'
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('token');
          done();
        });
    });
  });

  describe('POST /api/auth/login', () => {
    it('should login an existing user', (done) => {
      chai.request(app)
        .post('/api/auth/login')
        .send({
          email: 'testuser@example.com',
          password: 'password123'
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('token');
          done();
        });
    });
  });
});

