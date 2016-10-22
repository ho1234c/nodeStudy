import user from '../controllers/user';

export default router => {
    router.route('/user/login')
        .post(user.login);
};

