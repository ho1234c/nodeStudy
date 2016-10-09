import index from '../controllers/index';

export default router => {
    router.get('/', index.render);
};