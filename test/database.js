import chai from 'chai';
import promise from 'bluebird';
import db from '../src/server/models';

chai.should();

describe('Database test', () => {
    before(done => {
        db.sequelize.sync({force: true})
            .then(() => {
                done()
            })
    });
    it('create user', done => {
        db.User.create({email: 'mocha@mocha.com', nickname: 'mocha', password: 'mocha'})
            .then(() => {
                done();
            })
    });

    it('create list', done => {
        db.List.create({name: 'test list', detail: 'test detail', like: 100, songInfo: 'test songInfo', makerId: 1})
            .then(() => {
                done();
            })
    });

    it('create comment ', done => {
        db.Comment.create({content: 'test content', like: 10, ListId: 1, writerId: 1})
            .then(() => {
                done();
            })
    });

    it('set favor', done => {
        let user = db.User.findOne();
        let list = db.List.findOne();
        let comment = db.Comment.findOne();

        promise.all([user, list, comment]).then((result) => {
            user = result[0];
            list = result[1];
            comment = result[2];
            user.addListFavor(list);
            comment.addUserFavor(user);

            done();
        })
    });

    it('user authentication', done => {
        db.User.findOne({where: {email: 'mocha@mocha.com'}})
            .then(user => {
                user.authenticate('mocha', (err, res) => {
                    (err === null).should.be.true;
                    res.should.be.true;
                    done();
                });

            })
    })
});