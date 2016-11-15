import list from '../controllers/list';

export default router => {
    router.get('/list', list.load);
    router.post('/list', list.multerConfig, list.createList);
    router.get('/list/song/:id', list.listDetail);
    router.post('/list/like/:id', list.like);
};