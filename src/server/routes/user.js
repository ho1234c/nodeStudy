import user from '../controllers/user';

export default router => {
    router.post('/user', user.create);
    router.post('/user/login', user.login);
    router.get('/user/login/facebook', user.loginFromFacebook);
    router.get('/user/login/facebook/callback', user.facebookCallback);
    router.get('/user/logout', user.logout);
};

