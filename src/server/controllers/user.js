import passport from 'passport';

export default {
    create(req, res){

    },
    read(req, res){

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
                name: user.nickname,
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
