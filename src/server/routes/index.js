import index from '../controllers/index';

export default router => {
    router.route('/')
        .get(index.render);

    router.route('/session')
        .get(index.session);

    router.route('/search/:word')
        .get(index.search);
};