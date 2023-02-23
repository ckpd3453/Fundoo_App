import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';

import app from '../../src/index';

/**
 * Data Base Connection and to clear data base
 */
describe('User APIs Test', () => {
  var token;
  var noteId;
  before((done) => {
    const clearCollections = () => {
      for (const collection in mongoose.connection.collections) {
        mongoose.connection.collections[collection].deleteOne(() => {});
      }
    };

    const mongooseConnect = async () => {
      await mongoose.connect(process.env.DATABASE_TEST);
      clearCollections();
    };

    if (mongoose.connection.readyState === 0) {
      mongooseConnect();
    } else {
      clearCollections();
    }

    done();
  });

  /**
   * User Registration Test
   */
  describe('POST /user registration', () => {
    it('should able to create user when user data is given', (done) => {
      const user = {
        firstName: 'Aaptarish',
        lastName: 'Prasad',
        email: 'krishnaa@01gmail.net',
        password: 'Harry@123',
        confirmPassword: 'Harry@123'
      };
      request(app)
        .post('/api/v1/users')
        .send(user)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(201);
          expect(res.body.data).to.be.an('object');

          done();
        });
    });

    it('When invalid data passed user should not regiser', (done) => {
      const user = {
        firstName: 'Aaptarish',
        lastName: 'Prasad',
        email: 'krishnaa@01gmail.net',
        password: 'Harry123',
        confirmPassword: 'Harry@123'
      };
      request(app)
        .post('/api/v1/users')
        .send(user)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(400);
          expect(res.body.data).to.be.equal('password.minOfSpecialCharacters');

          done();
        });
    });
  });

  /**
   * User Login Test
   */
  describe('Post /User Login', () => {
    it('When given correct Email Id and Password then User Can able to Login', (done) => {
      const login_credentials = {
        email: 'krishnaa@01gmail.net',
        password: 'Harry@123'
      };
      request(app)
        .post('/api/v1/users/login')
        .send(login_credentials)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(200);
          token = res.body.data.Auth;
          done();
        });
    });

    it('When given Email Id or Password is incorrect then User Can not able to Login', (done) => {
      const login_credentials = {
        email: 'krishna@01gmail.net',
        password: 'Harry@123'
      };
      request(app)
        .post('/api/v1/users/login')
        .send(login_credentials)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(400);

          done();
        });
    });
  });

  /**
   * Creating Note Test
   */
  describe('Post /create note', () => {
    it('When user is valid then it should create note', (done) => {
      const note = {
        title: 'Burning Train',
        description: 'Train Was burning'
      };

      request(app)
        .post('/api/v1/notes')
        .set('Authorization', 'Bearer ' + token)
        .send(note)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(201);
          noteId = res.body.data._id;
          done();
        });
    });

    it('When user is not valid then it should not create note', (done) => {
      const note = {
        title: 'Burning Train',
        description: 'Train Was burning'
      };

      request(app)
        .post('/api/v1/notes')
        .send(note)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(400);

          done();
        });
    });
  });

  /**
   * Getting Note Test
   */
  describe('get /get note', () => {
    it('able to get all notes when valid user', (done) => {
      request(app)
        .get('/api/v1/notes')
        .set('Authorization', 'Bearer ' + token)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(200);

          done();
        });
    });

    it('When user is not valid then it should not able to get notes', (done) => {
      request(app)
        .get('/api/v1/notes')
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(400);

          done();
        });
    });

    it('Should Able to get note by Id when user is valid', (done) => {
      request(app)
        .get(`/api/v1/notes/${noteId}`)
        .set('Authorization', 'Bearer ' + token)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(200);

          done();
        });
    });
  });

  /**
   * Update Note Test
   */
  describe('Update /Update Note by Id', () => {
    it('should able to update note when user and note id is valid', (done) => {
      const note = {
        title: 'Burning Train',
        description: 'Train Was burning Updated'
      };
      request(app)
        .put(`/api/v1/notes/${noteId}`)
        .set('Authorization', 'Bearer ' + token)
        .send(note)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(200);

          done();
        });
    });
  });

  /**
   * Delete Note Test
   */
  describe('Delete/Delete Note By Id', () => {
    it('should able to delete note when valid user and note id is given', (done) => {
      request(app)
        .delete(`/api/v1/notes/${noteId}`)
        .set('Authorization', 'Bearer ' + token)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(200);

          done();
        });
    });
  });
});
