import index from '../controllers/index';

export default router => {
    router.get('/', index.render);
    router.get('/session', index.session);
    router.get('/search/:word', index.search);
    router.get('/*', index.render); //for pretty url
};