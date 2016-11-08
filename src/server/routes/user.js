import user from '../controllers/user';

export default router => {
    router.route('/user')
        .post(user.create);
    router.route('/user/login')
        .post(user.login);
    router.route('/user/logout')
        .get(user.logout);
};

