import passport from 'passport';
import db from '../models';

export default {
    create(req, res, next){
        db.User.create(req.body)
            .then(() => {
                passport.authenticate('local', (err, user) => {
                    const userData = {
                        id: user.id,
                        nickname: user.nickname,
                        email: user.email,
                    };

                    req.logIn(userData, err => {
                        if(err) {
                            return next(err);
                        }
                        return res.json({user: userData});
                    })
                })(req, res, next)
            })
    },
    login(req, res, next){
        passport.authenticate('local', (err, user, info) => {
            if(err){
                return next(err);
            }
            if(!user || info){
                return res.status(400).json(info);
            }
            const userData = {
                id: user.id,
                nickname: user.nickname,
                email: user.email,
                list: user.listFavor
            };

            return req.logIn(userData, err => {
                if (err) {
                    return next(err);
                }
                return res.json({user: userData});
            });
        })(req, res, next)
    },

    logout(req, res){
        req.logout();
        res.sendStatus(200);
    }
}
