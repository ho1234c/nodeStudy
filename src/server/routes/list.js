import list from '../controllers/list';

export default router => {
    router.route('/load/list')
        .get(list.load)
        .post(list.createList);
    router.route('/load/song/:id')
        .get(list.listDetail);
};