import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import sinon from 'sinon';
import userController from '../../server/controllers/auth/userAuth';
import url from '../../server/index';
import models from '../../server/models';
import valid
  from '../../server/helpers/passwordHash';
import loginFactory from '../mocks/factories/userFactory';

chai.use(chaiHttp);

const { User } = models;

describe('API endpoint for POST auth/signin - Email Validations', () => {
  before(async () => {
    await User.create({
      email: 'opeyemi@yahoo.com',
      firstName: 'Danielshow',
      lastName: 'Opeyemi',
      userName: 'shotonwaa',
      password: valid.hashPassword('danielshow2#')
    });
  });

  it('should fail if password is incorrect', async () => {
    const user = loginFactory.build({
      email: 'opeyemi@yahoo.com',
      password: 'daniel#2jjfj'
    });
    await chai.request(url)
    .post('/api/v1/auth/signin')
    .send(user)
    .then((res) => {
      expect(res).to.have.status(400);
      expect(res.body).to.be.an('Object');
      expect(res.body.msg).to.be.equals('Invalid email or password');
    });
  });

  it('should fail if email field is empty', () => {
    const user = loginFactory.build({
      email: null,
      password: 'daniel#2jjfj'
    });
    chai.request(url)
    .post('/api/v1/auth/signin')
    .send(user)
    .then((res) => {
      expect(res).to.have.status(400);
      expect(res.body).to.be.an('Object');
      expect(res.body.msg).to.be.equals('Email field cannot be empty');
    });
  });

  it('should fail if user supply invalid email', () => {
    const user = loginFactory.build({
      email: 'daniel@yeheeheh'
    });
    chai.request(url)
    .post('/api/v1/auth/signin')
    .send(user)
    .then((res) => {
      expect(res).to.have.status(400);
      expect(res.body).to.be.an('Object');
      expect(res.body.msg).to.be.equals('Invalid Email: supply a valid email');
    });
  });

  it('should fail if a password is not supplied', () => {
    const user = loginFactory.build({
      password: '  ',
      email: 'opeyemi@yahoo.com',
    });
    chai.request(url)
    .post('/api/v1/auth/signin')
    .send(user)
    .then((res) => {
      expect(res).to.have.status(400);
      expect(res.body).to.be.an('Object');
      expect(res.body.msg).to.be.equals('Password field cannot be empty');
    });
  });

  it('should fail if a password is not valid', () => {
    const user = loginFactory.build({
      password: 'gyhhjjkjj',
      email: 'opeyemi@yahoo.com',
    });
    chai.request(url)
    .post('/api/v1/auth/signin')
    .send(user)
    .then((res) => {
      expect(res).to.have.status(400);
      expect(res.body).to.be.an('Object');
      expect(res.body.msg).to.be.equals(
        'Invalid Password: Password must contains a number and a symbol');
    });
  });

  it('should fail if a email is not in the database', async () => {
    const user = loginFactory.build({
      password: 'fdghjku',
      email: 'opeyemi@yahhhhoo.com',
    });
    await chai.request(url)
    .post('/api/v1/auth/signin')
    .send(user)
    .then((res) => {
      expect(res).to.have.status(400);
      expect(res.body).to.be.an('Object');
      expect(res.body.msg).to.be.equals(
        'Invalid email or password');
    });
  });

  it('should login with valid email and password', async () => {
    const user ={
      email: 'opeyemi@yahoo.com',
      password: 'danielshow2#'
    };
    await chai.request(url)
    .post('/api/v1/auth/signin')
    .send(user)
    .then((res) => {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('Object');
      expect(res.body.msg).to.be.equals('Login successful');
    });
  });

  it('fake test: should return 500 error', async () => {
    const user = {
      email: 'opeyemi@yahoo.com',
      password: 'danielshow2#'
    };
    const req={
      body: user
    };

    const res = {};

    const next = sinon.stub();
    sinon.stub(User, 'findOne').throws();
    await userController.loginUser(req, res, next);
    expect(next.called).to.be.true;
    sinon.restore();
  });
});
