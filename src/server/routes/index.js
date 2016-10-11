import index from '../controllers/index';

export default router => {
    router.route('/')
        .get(index.render);

    router.route('/dummy')
        .get(index.dummy);
};