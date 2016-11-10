import list from '../controllers/list';

export default router => {
    router.get('/load/list', list.load);
    router.post('/load/list', list.multerConfig, list.createList);
    router.get('/load/song/:id', list.listDetail);
};