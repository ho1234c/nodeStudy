import passport from 'passport';
import LocalStrategy from 'passport-local';
import db from '../models'


export default function(app){
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        },
        (email, password, done) => {
            db.User.findOne({where: {email: email}, include: {model: db.List}})
                .then(user => {
                    console.log(user);
                    if(!user){
                        return done(null, false, {message: 'not found'})
                    }
                    user.authenticate(password, (err, isMatch) => {
                        if(err){
                            return done(err);
                        }
                        if(!isMatch){
                            return done(null, false, {message: 'Invalid'});
                        }
                        return done(null, user);

                    });
                })
        }
    ));

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });
}
