import passport from 'passport';
import LocalStrategy from 'passport-local';
import db from '../models'


export default function(app) {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        },
        (email, password, done) => {
            db.User.findOne({
                where: { email: email },
                include: [
                    { model: db.List, as: 'listFavor', attributes: ['id', 'name'] },
                    { model: db.Comment, as: 'commentFavor', attributes: ['id'] }
                ]
            })
                .then(user => {
                    if(!user){
                        return done(null, false, {message: '이메일을 찾을 수 없습니다'})
                    }
                    user.authenticate(password, (err, isMatch) => {
                        if(err){
                            return done(err);
                        }
                        if(!isMatch){
                            return done(null, false, {message: '비밀번호가 틀립니다'});
                        }
                        return done(null, user);

                    });
                })
        }
    ));
    // serialize시 한커번에 user data를 세션에 저장.
    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });
}
