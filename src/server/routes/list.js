import list from '../controllers/list';

export default router => {
    router.route('/load/list')
        .get(list.load);

    router.route('/load/song/:id')
        .get(list.listDetail);
};