// import chai, { expect } from 'chai';
// import chaiHttp from 'chai-http';

// import app from '../../server/index';
// import models from '../../server/models';
// import userAuth from '../../server/controllers/auth/userAuth';
// import comment from '../../server/controllers/commentController';
// import userFactory from '../mocks/factories/userFactory';



// chai.use(chaiHttp);

// const { User, Comment} = models;
// const user = userFactory.build({
//   password: 'opeyemi2018*'
// });
// const articleComment = 'this is my comment';

// describe('Post comment on an Article', () => {
//   let id,token;
//   before(() => {
//     chai.request(app)
//     .post('/api/v1/auth/signup')
//     .send(user)
//     .then(res => {
//       id = res.body.user.id;
//       token = res.body.token;
//     });
//   });

//   it('should return 200 when a comment is posted', (done) => {
//     chai.request(app).post('/api/v1/menu')
//       .send(articleComment)
//       .set('Authorization', `Bearer ${token}`)
//       .expect(201)
//       .expect((res) => {
//         console.log('this is th res body', res.body);
//       })
//       .end(done);
//   });
// });
