import user from '../controllers/user';

export default router => {
    router.post('/user', user.create);
    router.post('/user/login', user.login);
    router.get('/user/logout', user.logout);
};

