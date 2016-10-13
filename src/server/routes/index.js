import index from '../controllers/index';

export default router => {
    router.route('/')
        .get(index.render);
};