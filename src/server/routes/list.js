import list from '../controllers/list';

export default router => {
    router.get('/list', list.load);
    router.post('/list', list.multerConfig, list.create);
    router.get('/list/song/:id', list.detail);
    router.post('/list/like/:id', list.like);
    router.post('/comment', list.createComment);
    router.post('/comment/like/:id', list.likeComment);
};